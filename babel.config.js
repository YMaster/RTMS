const presets = ["@babel/env", "@babel/preset-react"]
const plugins = [
  ['@babel/plugin-transform-runtime', { corejs: 3 }],
  // '@babel/plugin-syntax-dynamic-import',   // 如果需要在entry中添加其它文件打包的话
  "@babel/plugin-proposal-class-properties",
  // ["import", {
  //   libraryName: "antd",
  //   libraryDirectory: "es",
  //   style: "css"
  // }],
]

module.exports = {
  presets,
  plugins,
}