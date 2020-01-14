# node-anyserver
a static resource server which development by node

## 安装启动
```cmd
npm i
npm run start
```
## 开发
严格eslint  提交之前必须通过eslint（pre-commit）
```cmd
npm run lint
```

## 调试
- 1.node --inspect-brk app.js(先打开chrome调试界面，启动命令加-brk送启动开始调试，调试界面打开，正常chrome调试即可)
- 2.IDE调试 (vs code 调试选项-》设置配置参数启动选项，打断点，结合启动调试)

## 开发节点
- 1.框架搭建 github创建仓库添加README.md
- 2.npm init 创建package.json
- 3.加入eslint
- 4.创建初始http 使用supervisor启动服务（supervisor监控代码改动 全局安装） supervisor src/app.js
- 5.加入路由 并用promisify解决异步回调
- 6.添加模板ejs
- 7.定义文件类型 MIME
- 8.http压缩(compress.js 对比压缩前后看一下)
- 9.http缓存(根据请求头if-modified-since和if-none-match和响应头last-modified和etag字段对比确定是否重新请求 200/304)
（注意点：chrome浏览器刷新都是200是因为浏览器的原因，显示frome dist/memory cache  火狐显示304）

- 10.实现cli命令行
- 11.npm包