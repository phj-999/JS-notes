console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
const b = [
    {
        "title": "冰箱",
        "num": 1827
    },
    {
        "title": "洗衣机",
        "num": 342
    },
    {
        "title": "电视机",
        "num": 541
    },
    {
        "title": "微波炉",
        "num": 1347
    },
    {
        "title": "烤箱",
        "num": 2431
    },
    {
        "title": "空调",
        "num": 876
    },
    {
        "title": "洗碗机",
        "num": 1578
    }
]
const a = b.map(x => {
    return x.title })
console.log(a, "a");

console.log(b.values());
for (const c of b) {
    console.log(c.title,c.num);
    console.log(typeof(c));
}
JSON.parse(
    JSON.stringify(store.state.echartModule.horizontalbar)
  )
