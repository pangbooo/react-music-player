const URL = {
    // 推荐轮播
    carousel: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    //最新专辑
    newalbum: 'https://u.y.qq.com/cgi-bin/musicu.fcg'
}

// 如不需要jsonp调用
/*
    PARAM.format = 'json
    OPTION.param = 'callback
*/

const PARAM = {
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
}

const OPTION = {
    param: 'jsonpCallback',
    prefix: 'callback'
}

const CODE_SUCCESS = 0;

export { URL, PARAM, OPTION, CODE_SUCCESS }
