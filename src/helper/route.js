const fs = require('fs')
const promisify = require('util').promisify

// 异步方法写成promise形式
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

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
            res.statusCode = 200
            res.setHeader('content-type', 'text/plain')
            res.end(files.join(','))
        }
    } catch (err) {
        console.error(err)
        res.statusCode = 404
        res.setHeader('content-type', 'text/plain')
        res.end(`${filePath} is not a direction or file ${err}`)
    }
}