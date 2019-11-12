const config = require('../config/baseConfig')
function setRESCache (stats, res) {
    const {maxAge, expires, CacheControl, LastModified, Etag} = config.cache

    if (expires) {
        res.setHeader('Expires', new Date(Date.now() + maxAge*1000).toUTCString())
    }
    if (CacheControl) {
        res.setHeader('Cache-Control', `max-age=${maxAge}`)
    }
    if (LastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }
    if (Etag) {
        res.setHeader('Etag', `${stats.size}-${stats.mtime}`)
    }
}
/**
 * 本地缓存信息是否是最新的
 * @return {Boolean} false重新获取200 true304 
*/
module.exports = function isFresh (stats, req, res) {
    setRESCache(stats, res)

    const lastModify = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']

    // 第一次请求
    if (!etag && !lastModify) {
        return false
    }
    if (lastModify &&  lastModify != res.getHeader('Last-Modified')) {
        return false
    }
    if (etag && etag != res.getHeader('Etag')) {
        return false
    }
    return true
}