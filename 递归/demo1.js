const data = [
    { id: 1, parent: null, text: "菜单1" },
    { id: 11, parent: 1, text: "菜单1-1" },
    { id: 12, parent: 1, text: "菜单1-2" },
    { id: 2, parent: null, text: "菜单2" },
    { id: 21, parent: 2, text: "菜单2-1" }
];


const getTreeList = (rootList, id, list) => {
    for (const item of rootList) {
        if (item.parent == id) {
            list.push(item);
        }
    }

    for (const i of list) {
        i.children = [];
        getTreeList(rootList, i.id, i.children);
        if (i.children.length == 0) {
            delete i.children;
        }
    }
    return list;
};

const res = getTreeList(data, null, []);
console.log(res, "res");

//   res结果
[
    {
        "id": 1,
        "parent": null,
        "text": "菜单1",
        "children": [
            {
                "id": 11,
                "parent": 1,
                "text": "菜单1-1"
            },
            {
                "id": 12,
                "parent": 1,
                "text": "菜单1-2"
            }
        ]
    },
    {
        "id": 2,
        "parent": null,
        "text": "菜单2",
        "children": [
            {
                "id": 21,
                "parent": 2,
                "text": "菜单2-1"
            }
        ]
    }
]