import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Space, Table } from 'antd';
import * as ExcelJs from "exceljs";
import { Worksheet } from "exceljs";
import { ITableHeader, StudentInfo } from '../../types/table';
import { columns } from './config/columns';
import { DEFAULT_COLUMN_WIDTH, generateHeaders, saveWorkbook } from '../../utils/excelconfig';
import { handleHeader, mergeRowCell } from '../../utils/excelforMultiHeader';

interface MultiHeaderProps {
}


const MultiHeader: React.FC<MultiHeaderProps> = () => {

  const [list, setList] = useState<StudentInfo[]>([]);
  const workbook = useMemo(() => new ExcelJs.Workbook(), [])  //创建工作普

  const generateData = () => {
    let arr: StudentInfo[] = [];
    for (let i = 0; i < 5; i++) {
      arr.push({
        id: i,
        name: `小明${i}号`,
        age: 8 + i,
        gender: i % 2 === 0 ? '男' : '女',
        english: 80 + i,
        math: 60 + i,
        physics: 70 + i,
        comment: `小明${i}号同学表现非常好，热心助人，成绩优秀，是社会主义接班人。热心助人，成绩优秀，是社会主义接班人。热心助人，成绩优秀，是社会主义接班人`
      })
    }
    setList(arr);
  }

  useEffect(() => {
    generateData();
  }, [])

  /**添加数据 */
  const addData2Table = (worksheet: Worksheet, headerKeys: string[], headers: ITableHeader[]) => {
    list?.forEach((item: any) => {
      const rowData = headerKeys?.map(key => item[key]);
      const row = worksheet.addRow(rowData);
      mergeRowCell(headers, row, worksheet);
      row.height = 26;
      // 设置行样式, wrapText: 自动换行
      row.alignment = { vertical: 'middle', wrapText: true, shrinkToFit: false };
      row.font = { size: 11, name: '微软雅黑' };
    })
  }


  const onExportMultiHeaderExcel = () => {
    // 添加sheet
    const worksheet = workbook.addWorksheet('demo sheet');
    // 设置 sheet 的默认行高
    worksheet.properties.defaultRowHeight = 20;
    // 解析 AntD Table 的 columns
    const headers = generateHeaders(columns);
    console.log({ headers })
    // 第一行表头
    const names1: string[] = [];
    // 第二行表头
    const names2: string[] = [];
    // 用于匹配数据的 keys
    const headerKeys: string[] = [];
    headers?.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          names1.push(item.header);
          names2.push(child.header);
          headerKeys.push(child.key);
        })
      } else {
        const columnNumber = Math.round(item.width / DEFAULT_COLUMN_WIDTH)
        for (let i = 0; i < columnNumber; i++) {
          names1.push(item.header);
          names2.push(item.header);
          headerKeys.push(item.key);
        }
      }
    })
    handleHeader(worksheet, headers, names1, names2)
    // 添加数据
    addData2Table(worksheet, headerKeys, headers);
    // 给每列设置固定宽度
    worksheet.columns = worksheet.columns.map(col => ({
      ...col,
      width: DEFAULT_COLUMN_WIDTH
    }));
    // 导出excel
    saveWorkbook(workbook, 'simple-demo.xlsx');
  }

  return (
    <Card>
      <h3>多表头表格</h3>
      <Space style={{ marginBottom: 10 }}>
        <Button type={'primary'} onClick={onExportMultiHeaderExcel}>导出excel</Button>
      </Space>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={list}
      />
    </Card>
  )
}

export default MultiHeader