import { ColumnsType } from "antd/lib/table/interface";

export const columns: ColumnsType<any> = [
    {
        width: 50,
        dataIndex: 'id',
        key: 'id',
        title: 'ID',
    },
    {
        width: 100,
        dataIndex: 'name',
        key: 'name',
        title: '姓名',
    },
    {
        width: 50,
        dataIndex: 'age',
        key: 'age',
        title: '年龄',
    },
    {
        width: 80,
        dataIndex: 'gender',
        key: 'gender',
        title: '性别',
    },
    {
        dataIndex: 'score',
        key: 'score',
        title: '成绩',
        children: [
            {
                width: 80,
                dataIndex: 'english',
                key: 'english',
                title: '英语',
            },
            {
                width: 80,
                dataIndex: 'math',
                key: 'math',
                title: '数学',
            },
            {
                width: 80,
                dataIndex: 'physics',
                key: 'physics',
                title: '物理',
            },
        ]
    },
    {
        width: 250,
        dataIndex: 'comment',
        key: 'comment',
        title: '老师评语',
    },
];