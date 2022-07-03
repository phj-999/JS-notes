import React, { FC, useEffect, useState } from "react";
import * as ExcelJs from "exceljs";
import { Button, Card, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";

import { StudentInfo } from "../../types";
import { generateHeaders, saveWorkbook } from "../../utils"; //根据antd的column生成exceljs的 column

interface SimpleDemoProps {}

const SimpleDemo: FC<SimpleDemoProps> = () => {
  const [list, setList] = useState<StudentInfo[]>([]);

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
  /**表头 */
  const columns: ColumnsType<any> = [
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
  ];
  /**
   * 导出excel
   *普通方式导出
   */
  const onExportBasicExcel = () => {
    //创建工作簿
    const workbook = new ExcelJs.Workbook();
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
  };

/**
 *  导出带样式excel
 *  */
const onExportBasicExcelWithStyle = () => {}

/**
 *  封装方法导出excel
 *  */
 const onExportExcel = () => {}
 /**
 *  导出zip
 *  */
 const onExportZip = () => {}
 /**
 *  导出分文件夹zip
 *  */
 const onExportFolderZip = () => {}
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
