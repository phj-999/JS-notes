/**
 * Mark 组件是否正确高亮关键词
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Mark } from "../components/mark";

test("Mark 组件正确高亮关键词", () => {
    const name = "物料管理";
    const keyword = "管理";
  
    render(<Mark name={name} keyword={keyword} />);
  
    expect(screen.getByText(keyword)).toBeInTheDocument(); //证明keyword是否在页面里渲染了
    expect(screen.getByText(keyword)).toHaveStyle("color: #257AFD");//证明keyword是否在页面里是否是这个颜色
    expect(screen.getByText("物料")).not.toHaveStyle("color: #257AFD");//物料  是否渲染且是这个颜色
  });
  