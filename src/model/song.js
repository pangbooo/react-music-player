// 歌曲类模型
export class Song{
    constructor(id, mId, name, img, duration, url, singer){
        this.id = id;
        this.mId = mId;
        this.name = name;
        this.img = img;
        this.duration = duration;
        this.url = url;
        this.singer = singer
    }
}

// 创建歌曲对象函数
export function createSong(data){
    return new Song(
        data.albumid,
        data.albummid,
        data.albumname,
        `http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
        data.interval,
        "",
        filterSing(data.singer)
    )

    function filterSing(singers){
        let singerArray = singers.map( singer => {
            return singer.name
        });
        return singerArray.join('/');
    }
}