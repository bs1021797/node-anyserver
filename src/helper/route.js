const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const conf = require('../config/baseConfig')

// 异步方法写成promise形式
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
// 模板引擎 ejs
const ejs = require('ejs')
// 模板文件 注意这里模板路径必须是绝对的 path.resolve和path.join区别 前者一定返回绝对路径，后者是拼接
const tpl = fs.readFileSync(path.resolve(__dirname, '../template/dir.ejs'))

// 提取async await  作路由功能
module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            res.statusCode = 200
            res.setHeader('content-type', 'text/plain')
            fs.createReadStream(filePath).pipe(res)
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath)
            // 模板数据 path取相对路径（文件相对于当前执行路径的） 针对多层次目录  提出来相对根目录所以`/${dir}`
            const dir = path.relative(conf.root, filePath)
            const data = {
                title: path.basename(filePath),
                path: dir ? `/${dir}` : '',
                files
            }
            res.statusCode = 200
            res.setHeader('content-type', 'text/html')
            res.end(ejs.render(tpl.toString(), data))
        }
    } catch (err) {
        res.statusCode = 404
        res.setHeader('content-type', 'text/plain')
        res.end(`${filePath} is not a direction or file ${err}`)
    }
}