
const {createGzip, createDeflate} = require ('zlib')

/**
 * 根据浏览器支持的压缩方式gzip\deflate设置服务器压缩方式并设置返回头压缩类型
 * rs 文件流
 * req 请求头
 * res 响应头
*/
module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding']
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) return
    if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        return rs.pipe(createGzip())
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return rs.pipe(createDeflate())
    }
}