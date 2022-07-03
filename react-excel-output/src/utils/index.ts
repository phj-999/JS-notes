import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

import { ITableHeader } from "../types/index";

//默认列宽
export const DEFAULT_COLUMN_WIDTH = 20;
//默认行高
export const DEFAULT_ROW_HEIGHT = 20;

/**
 * 导出文件
 * @param workbook
 * @param fileName
 */
export const saveWorkbook = (workbook: Workbook, fileName: string) => {
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
  });
};

/**
 * 根据antd的column生成exceljs的 column
 * @param columns
 */
export const generateHeaders = (columns: any[]) => {
  return columns?.map((column) => {
    const obj: ITableHeader = {
      header: column.title, // 显示的 name
      key: column.dataIndex,
      width: column.width / 5 || DEFAULT_COLUMN_WIDTH,
    };
    if (column.children) {
      obj.children = column.children?.map((i: any) => ({
        key: i.dataIndex,
        header: i.title,
        width: i.width,
        parentKey: column.dataIndex,
      }));
    }
    return obj;
  });
};
