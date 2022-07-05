import {ColumnType} from 'antd/es/table/interface';

export interface ISheet {
  // sheet名字
  sheetName: string;
  columns: ColumnType<any>[];
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

//压缩包
export interface IDownloadFiles2Zip {
  zipName: string;
  files: IDownloadExcel[];
}

//用于导出支持多级文件夹的压缩包
export interface IFolder {
  folderName: string;
  files: IDownloadExcel[];
}
export interface IDownloadFiles2ZipWithFolder {
  zipName: string;
  folders: IFolder[];
}