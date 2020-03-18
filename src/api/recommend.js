import jsonp from './jsonp';
import {URL, PARAM} from './config';

export function getCarousel(){
    const data = Object.assign({}, PARAM, {
        g_tk: 5381,
		uin: 1838529223,
		platform: "h5",
		needNewCode: 1,
        _: new Date().getTime(),
        data:`{"MusicHallDigitalAlbum":{"module":"mall.AlbumPgcMgrServer","method":"GetMallIndexPage","param":{}}}`
    });

    const option = {
        param: 'callback',
        prefix: 'callback'
    };

    return jsonp(URL.carousel, data, option);
}

export function geNewAlbum(){
    const data = Object.assign({}, PARAM, {
        g_tk: 1278911659,
		hostUin: 0,
		platform: "yqq",
        needNewCode: 0,
        data: `{"albumlib":
		{"method":"get_album_by_tags","param":
		{"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":50,"click_albumid":0},"module":"music.web_album_library"}}`
    });

    const option = {
        param: 'callback',
        prefix: 'callback'
    };

    return jsonp(URL.newalbum, data, option)
}

export function getAlbumInfo(albumMid){
    const data = Object.assign({}, PARAM,{
        '-': albumMid,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        platform: "yqq.json",
        needNewCode: 0,
        data: {"comm":{"ct":24,"cv":10000},"albumSonglist":{"method":"GetAlbumSongList","param":{"albumMid":"003GL7z20bhvk4","albumID":0,"begin":0,"num":10,"order":2},"module":"music.musichallAlbum.AlbumSongList"}}
    });
    const option = {
        param: 'callback',
        prefix: 'callback'
    };

    return jsonp(URL.albumInfo, data, option)
}