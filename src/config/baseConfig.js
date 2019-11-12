module.exports = {
    // 当前脚本工作目录的路径
    'root': process.cwd(),
    'hostname': '127.0.0.1',
    'port': '3003',
    'compress': /\.(html|js|css)/,
    'cache': {
        'maxAge': 600,
        'expires': true,
        'CacheControl': true,
        'LastModified': true,
        'Etag': true,
    }
}