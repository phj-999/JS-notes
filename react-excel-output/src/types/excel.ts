import { ColumnsType } from "antd/lib/table";

export interface ISheet {
  // sheet名字
  sheetName: string;
  columns: ColumnsType<any>[];
  dataSource: any[];
}

export interface IDownloadExcel {
  filename: string;
  sheets: ISheet[];
}

export interface IStyleAttr {
  color?: string;
  fontSize?: number;
  horizontal?:
    | "fill"
    | "distributed"
    | "justify"
    | "center"
    | "left"
    | "right"
    | "centerContinuous"
    | undefined;
  bold?: boolean;
}
