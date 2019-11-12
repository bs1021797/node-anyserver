const path = require('path')

const mineType = {
    'css': 'text/css',
    'js': 'text/javascript',
    'html': 'text/html',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'text': 'text/plain',
    'json': 'application/json',
}

module.exports = function (filepath) {
    // 获取扩展名最后一个.之后
    let ext = path.extname(filepath).split('.').pop().toLowerCase()
    // 没有扩展名取文件名  实际没有碰到过先写上
    if (!ext) {
        ext = filepath
    }
    return mineType[ext] || mineType['text']
}