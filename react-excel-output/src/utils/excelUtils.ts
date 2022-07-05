import * as ExcelJs from 'exceljs';
import { Workbook, Worksheet, Cell, Row } from 'exceljs';
import { IDownloadExcel, IDownloadFiles2Zip, IDownloadFiles2ZipWithFolder, IFolder, ISheet, IStyleAttr } from '../types/excel';
import { generateHeaders, saveWorkbook } from './excelconfig';
import JsZip from 'jszip'
import { saveAs } from 'file-saver';

//用于 封装方法导出excel的封装方法
/**
 * 给表格添加样式
 * @param cell 
 * @param attr 
 */
export const addCellStyle = (cell: Cell, attr?: IStyleAttr) => {
   const { color, fontSize, horizontal, bold } = attr || {};
   // eslint-disable-next-line no-param-reassign
   cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
   };
   // eslint-disable-next-line no-param-reassign
   cell.font = {
      bold: bold ?? true,
      size: fontSize ?? 11,
      name: '微软雅黑',
   };
   // eslint-disable-next-line no-param-reassign
   cell.alignment = { vertical: 'middle', wrapText: true, horizontal: horizontal ?? 'left' };
}

/**
 * 处理表格header
 * @param worksheet 
 */
export const handleHeader = (worksheet: Worksheet) => {
   // 给表头添加背景色。因为表头是第一行，可以通过 getRow(1) 来获取表头这一行
   const headerRow = worksheet.getRow(1);
   headerRow.height = 22;
   // 通过 cell 设置样式，更精准
   headerRow.eachCell((cell) => addCellStyle(cell, { color: 'dff8ff', fontSize: 12, horizontal: 'left' }));
}

/** 递归取出 render 里的值 */
export const getValueFromRender = (renderResult: any): any => {
   if (renderResult?.type) {
      let children = renderResult?.props?.children;
      if (children?.type) {
         return getValueFromRender(children);
      } else {
         return children;
      }
   }
   return ''
}

/**
 * 设置每行的样式
 * 
 */
const addStyleToData = (rows: Row[]) => {
   rows?.forEach((row) => {
      row.font = {
         size: 11,
         name: '微软雅黑'
      }
      row.alignment = {
         vertical: 'middle',
         horizontal: 'left',
         wrapText: true,
      }
   })
}

/**
 * 如果 column 有 render 函数，则以 render 渲染的结果显示
 * @param worksheet
 * @param sheet
 */
export const handleDataWithRender = (worksheet: Worksheet, sheet: ISheet) => {
   const { dataSource, columns } = sheet;
   const rowsData = dataSource?.map(data => {
      return columns?.map(column => {
         // @ts-ignore
         const renderResult = column?.render?.(data[column.dataIndex], data);
         if (renderResult) {
            // 如果不是 object 说明没包裹标签，是基本类型直接返回
            if (typeof renderResult !== "object") {
               return renderResult;
            }
            // 如果是 object 说明包裹了标签，逐级取出值
            return getValueFromRender(renderResult);
         }
         // @ts-ignore
         return data[column.dataIndex];
      })
   })
   // 添加行
   const rows = worksheet.addRows(rowsData);
   // 设置每行的样式
   addStyleToData(rows);
}

/**
 * 处理每个表格excel
 * @param workbook 
 * @param sheet 
 */
export const handleEachSheet = (workbook: Workbook, sheet: ISheet) => {
   // 添加sheet
   const worksheet = workbook.addWorksheet(sheet.sheetName);
   // 设置 sheet 的默认行高。设置默认行高跟自动撑开单元格冲突
   // worksheet.properties.defaultRowHeight = 20;
   // 设置列
   worksheet.columns = generateHeaders(sheet.columns)
   handleHeader(worksheet)
   handleDataWithRender(worksheet, sheet);
}

/**
   *  封装方法导出excel的封装方法
   *  */

export const downLoadExcel = (params: IDownloadExcel) => {
   console.log(params);
   // 创建工作簿
   const workbook = new ExcelJs.Workbook()
   params?.sheets?.forEach((sheet) => handleEachSheet(workbook, sheet));
   saveWorkbook(workbook, `${params.filename}.xlsx`)
}

//用于压缩包下载格式方法

const handleEachFile = async (param: IDownloadExcel, zip: JsZip, folderName: string) => {
   // 创建工作普
   const workbook = new ExcelJs.Workbook()
   param?.sheets?.forEach(sheet => { handleEachSheet(workbook, sheet) })
   // 生成blob
   const data = await workbook.xlsx.writeBuffer()
   const blob = new Blob([data], { type: '' })
   if (folderName) {
      zip.folder(folderName)?.file(`${param.filename}.xlsx`, blob)
   } else {
      // 写入 zip 中一个文件
      zip.file(`${param.filename}.xlsx`, blob);
   }
}

/**
 * 导出多个文件为zip压缩包
 */
export const downloadFiles2Zip = async (params: IDownloadFiles2Zip) => {
   const zip = new JsZip()
   const promises = params?.files?.map(async (param) => (await handleEachFile(param, zip, '')))
   await Promise.all(promises)
   zip.generateAsync({ type: 'blob' }).then(blob => {
      //saveAs(content, "example.zip");
      saveAs(blob, `${params.zipName}.zip`)
   })
}

//用于导出支持多级文件夹的压缩包

const handleFolder = async (zip: JsZip, folder: IFolder) => {
   console.log({ folder })
   let folderPromises: Promise<any>[] = [];
   const promises = folder?.files?.map(async param => await handleEachFile(param, zip, folder.folderName));
   await Promise.all([...promises, ...folderPromises]);
}


/**
 * 导出支持多级文件夹的压缩包
 * @param params
 */
export const downloadFiles2ZipWithFolder = async (params: IDownloadFiles2ZipWithFolder) => {
   const zip = new JsZip();
   const outPromises = params?.folders?.map(async folder => await handleFolder(zip, folder))
   await Promise.all(outPromises);
   zip.generateAsync({ type: "blob" }).then(blob => {
      saveAs(blob, `${params.zipName}.zip`)
   })
}