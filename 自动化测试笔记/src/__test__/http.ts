/**
 * 测试http这个函数
 */

 import { setupServer } from "msw/node";
 import { rest } from "msw";  //msw 单元测试时候mock数据的
 import { http } from "../utils/http";
 
 const apiUrl = process.env.REACT_APP_API_URL;
 const server = setupServer();
 
 // jest 是对react最友好的一个测试库
 // beforeAll 代表执行所有的测试之前，先来执行一下回调函数
 beforeAll(() => server.listen());
 
 // 每一个测试跑完以后，都重置mock路由
 afterEach(() => server.resetHandlers());
 
 // 所有的测试跑完后，关闭mock路由
 afterAll(() => server.close());
 
 //test表示要测试的函数
 test("http方法发送异步请求", async () => {
     const endpoint = "test-endpoint"; //要请求的地址
     const mockResult = { mockValue: "mock" };  //要返回的值
 
     server.use(
         rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
             res(ctx.json(mockResult))
         )
     );
 
     const result = await http(endpoint);
     expect(result).toEqual(mockResult); // toEqual是用来对比expect出来的result内容是否和mockResult相等
 });
 
 //npm run test  跑这个文件
 
 /**
  * http请求时会在header里是否带上token
  */
 
 test('http请求时会在header里带上token ', async () => {
     const token = "FAKE_TOKEN";
     const endpoint = "test-endpoint";
     const mockResult = { mockValue: "mock" };
 
     let request: any;
 
     server.use(
         rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
             request = req;
             return res(ctx.json(mockResult));
         })
     );
 
     await http(endpoint, { token });
     expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
 })
 