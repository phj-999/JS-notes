import { Row, Worksheet } from "exceljs";
import { IStyleAttr, ITableHeader } from "../types/table";
import { DEFAULT_COLUMN_WIDTH, DEFAULT_ROW_HEIGHT } from "./excelconfig";

//加表头样式
export const addHeaderStyle = (row: Row, attr?: IStyleAttr) => {
    const { color, fontSize, horizontal, bold } = attr || {}
    row.height = DEFAULT_ROW_HEIGHT
    row.eachCell((cell, colNumber) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: color },
        };
        cell.font = {
            bold: bold ?? true,
            size: fontSize ?? 11,
            name: '微软雅黑',
        };
        cell.alignment = { vertical: 'middle', wrapText: true, horizontal: horizontal ?? 'left' };
    })
}

// 表头根据内容宽度合并单元格
export const mergeRowCell = (headers: ITableHeader[], row: Row, worksheet: Worksheet) => {
    let colIndex = 1
    headers.forEach(header => {
        const { width, children } = header;
        if (children) {
            children.forEach(child => {
                colIndex += 1;
            });
        } else {
            // 需要的列数，四舍五入
            const colNum = Math.round(width / DEFAULT_COLUMN_WIDTH);
            // 如果 colNum > 1 说明需要合并
            if (colNum > 1) {
                worksheet.mergeCells(Number(row.number),
                    colIndex, Number(row.number), colIndex + colNum - 1);
            }
            colIndex += colNum;
        }
    });
}

//
export const mergeColumnCell = (headers: ITableHeader[],
    rowHeader1: Row,
    rowHeader2: Row,
    nameRow1: string[],
    nameRow2: string[],
    worksheet: Worksheet,) => {
    // 当前 index 的指针
    let pointer = -1;
    nameRow1.forEach((name, index) => {
        // 当 index 小于指针时，说明这一列已经被合并过了，不能再合并
        if (index <= pointer) return;
        // 是否应该列合并
        const shouldVerticalMerge = name === nameRow2[index];
        // 是否应该行合并
        const shouldHorizontalMerge = index !== nameRow1.lastIndexOf(name);
        pointer = nameRow1.lastIndexOf(name);
        if (shouldVerticalMerge && shouldHorizontalMerge) {
            // 两个方向都合并
            worksheet.mergeCells(
                Number(rowHeader1.number),
                index + 1,
                Number(rowHeader2.number),
                nameRow1.lastIndexOf(name) + 1,
            );
        } else if (shouldVerticalMerge && !shouldHorizontalMerge) {
            // 只在垂直方向上同一列的两行合并
            worksheet.mergeCells(Number(rowHeader1.number), index + 1, Number(rowHeader2.number), index + 1);
        } else if (!shouldVerticalMerge && shouldHorizontalMerge) {
            // 只有水平方向同一行的多列合并
            worksheet.mergeCells(
                Number(rowHeader1.number),
                index + 1,
                Number(rowHeader1.number),
                nameRow1.lastIndexOf(name) + 1,
            );
            const cell = rowHeader1.getCell(index + 1);
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        }
    });
}

/**
 * 处理表格头部
 * @param worksheet 
 * @param headers 
 * @param names1 
 * @param names2 
 */
export const handleHeader = (worksheet: Worksheet, headers: ITableHeader[],
    names1: string[],
    names2: string[],) => {
    // 判断是否有 children, 有的话是两行表头
    const isMultiHeader = headers?.some(i => i.children)
    if (isMultiHeader) {
        // 加表头数据
        const rowHeader1 = worksheet.addRow(names1);
        const rowHeader2 = worksheet.addRow(names2);
        // 添加表头样式
        addHeaderStyle(rowHeader1, { color: 'dff8ff' });
        addHeaderStyle(rowHeader2, { color: 'dff8ff' });
        mergeColumnCell(headers, rowHeader1, rowHeader2, names1, names2, worksheet);
        return;
    }
    // 加表头数据
    const rowHeader = worksheet.addRow(names1);
    // 表头根据内容宽度合并单元格
    mergeRowCell(headers, rowHeader, worksheet);
    // 添加表头样式
    addHeaderStyle(rowHeader, { color: 'dff8ff' });
}
