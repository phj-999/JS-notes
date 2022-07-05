import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import * as ExcelJs from "exceljs";
import { Button, Card, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";

import { StudentInfo } from "../../types/table";
import { generateHeaders, saveWorkbook } from "../../utils/excelconfig"; //根据antd的column生成exceljs的 column
import { downLoadExcel } from "../../utils/excelUtils";

interface SimpleDemoProps { }

const SimpleDemo: FC<SimpleDemoProps> = () => {
  const [list, setList] = useState<StudentInfo[]>([]);
  //表头
  const columns: ColumnsType<any> = useMemo(() => [
    {
      width: 50,
      dataIndex: "id",
      key: "id",
      title: "ID",
      render: (text, row) => (
        <div>
          <p>{row.id + 20}</p>
        </div>
      ),
      // render: (text, row) => String(text) === '0' ? '-' : text,
      // render: (text, row) => <div>{'hahaha'}</div>,
      // render: (text, row) => 'hahaha',
    },
    {
      width: 100,
      dataIndex: "name",
      key: "name",
      title: "姓名",
    },
    {
      width: 50,
      dataIndex: "age",
      key: "age",
      title: "年龄",
    },
    {
      width: 80,
      dataIndex: "gender",
      key: "gender",
      title: "性别",
    },
  ], [])
  //创建工作簿
  const workbook = useMemo(() => new ExcelJs.Workbook(), [])

  const generateData = () => {
    let arr: StudentInfo[] = [];
    for (let index = 0; index < 5; index++) {
      arr.push({
        id: index,
        name:
          index % 2 === 0
            ? `小明${index}号哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈啊哈嘿嘿哈哈或`
            : `小明${index}号`,
        age: 10 + index,
        gender: index % 2 === 0 ? "男" : "女",
      });
    }
    setList(arr);
  };

  useEffect(() => {
    generateData();
  }, []);

  /**
   * 导出excel
   *普通方式导出
   */
  const onExportBasicExcel = useCallback(
    () => {
      // //创建工作簿移到外面用usememo
      // const workbook = new ExcelJs.Workbook();
      //添加sheet
      const worksheet = workbook.addWorksheet("demo Sheet");
      //设置默认行高
      worksheet.properties.defaultRowHeight = 20;
      //设置列
      worksheet.columns = generateHeaders(columns);
      //添加行
      worksheet.addRows(list);
      //导出excel
      saveWorkbook(workbook, "simple-demo.xlsx");
    },
    [columns, list, workbook],
  )


  /**
   *  导出带样式excel
   *  */
  const onExportBasicExcelWithStyle = useCallback(
    () => {
      // 添加工作表sheet
      const worksheet = workbook.addWorksheet('demo sheet')
      // 设置 工作表sheet行高
      worksheet.properties.defaultRowHeight = 20
      // 设置列
      worksheet.columns = generateHeaders(columns)
      // 给表头添加背景色。因为表头是第一行，可以通过 getRow(1) 来获取表头这一行
      //获取一个行对象。如果尚不存在，则将返回一个新的空对象
      let headerROW = worksheet.getRow(1)
      // 连续遍历所有非空单元格 来设置样式
      headerROW.eachCell((cell, colNum) => {
        // 填充
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'dff8ff' }
        }
        //字体
        cell.font = {
          bold: true,
          italic: true,
          size: 12,
          name: '微软雅黑',
          color: { argb: 'ff0000' },
        }
        // 设置对齐方式
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: false, };
      })
      // 添加行
      let rows = worksheet.addRows(list)
      // 设置每行的样式
      rows?.forEach(row => {
        // 设置字体
        row.font = {
          size: 11,
          name: '微软雅黑',
        };
        // 设置对齐方式
        row.alignment = { vertical: 'middle', horizontal: 'left', wrapText: false, };
      })
      // 导出excel
      saveWorkbook(workbook, 'simple-demo.xlsx')
    },
    [columns, list, workbook],
  )

  /**
   *  封装方法导出excel
   *  */
  const onExportExcel = () => {
    downLoadExcel({
      filename: 'test',
      sheets: [{
        sheetName: 'test',
        columns: [columns],
        dataSource: list
      }]
    })
  }
  /**
  *  导出zip
  *  */
  const onExportZip = () => { }
  /**
  *  导出分文件夹zip
  *  */
  const onExportFolderZip = () => { }

  return (
    <Card>
      <h3>简单的表格</h3>
      <Space style={{ marginBottom: 10 }}>
        <Button type={"primary"} onClick={onExportBasicExcel}>
          普通导出excel
        </Button>
        <Button type={"primary"} onClick={onExportBasicExcelWithStyle}>
          导出带样式excel
        </Button>
        <Button type={"primary"} onClick={onExportExcel}>
          封装方法导出excel
        </Button>
        <Button type={"primary"} onClick={onExportZip}>
          导出zip
        </Button>
        <Button type={"primary"} onClick={onExportFolderZip}>
          导出分文件夹zip
        </Button>
      </Space>
      <Table rowKey={"id"} columns={columns} dataSource={list} />
    </Card>
  );
};

export default SimpleDemo;
