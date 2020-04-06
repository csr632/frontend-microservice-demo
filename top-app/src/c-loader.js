// // 依赖外部
// import("@micro-frontend-demo/team-c")

// // 自己加载
// import("@micro-frontend-demo/team-c/factory").then(module =>
//   module.default({ jquery: $ })
// );

// 将自己的React注入给team-c
import React from "react";

// 从cdn加载 jquery
// （构建时external掉）
import $ from "jquery";

// 从cdn加载 team-c/factory
// （构建时external掉）
import factory from "@micro-frontend-demo/team-c/factory";
const TeamC = factory({ jquery: $, React });

export default TeamC;
