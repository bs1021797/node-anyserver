const http = require('http')
// 基本配置
const conf = require('./config/baseConfig')
// node样式修饰模块
const chalk = require('chalk')
const path = require('path')
// 路由 区分文件还是文件夹  文件夹列出  文件读出内容
const route = require('./helper/route')

const server = http.createServer((req, res) => {
    // 文件路径
    const filePath = path.join(conf.root, req.url)
    route(req, res, filePath)
    
    // 判断文件类型
    // fs.stat(filePath, (err, stats) => {
    //     // 文件找不到错误处理
    //     if (err) {
    //         res.statusCode = 404
    //         res.setHeader('content-type', 'text/plain')
    //         res.end(`${filePath} is not a direction or file`)
    //         return
    //     }
    //     if (stats.isFile()) {
    //         res.statusCode = 200
    //         res.setHeader('content-type', 'text/plain')
    //         fs.createReadStream(filePath).pipe(res)
    //     } else if (stats.isDirectory()) {
    //         fs.readdir(filePath, (err, files) => {
    //             res.statusCode = 200
    //             res.setHeader('content-type', 'text/plain')
    //             res.end(files.join(','))
    //         })
    //     }

    // })
    // res.statusCode = 200
    // res.setHeader('content-type', 'text/plain')
})

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.info(`server is runing on port ${chalk.green.bold(addr)}`)
})