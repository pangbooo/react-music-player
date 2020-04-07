import * as SongModel from './song';

export class Ranking {
    constructor(id, title, img, songs){
        this.id = id;
        this.title = title;
        this.img = img;
        this.songs = songs;
    }
}

export function createRankingByList(data) {
    const songList = [];
    data.songList.forEach(item => {
        songList.push(new SongModel.Song(0, '', item.songname,'',0,'',item.singername))
    });

    return new Ranking(
        data.id,
        data.topTitle,
        data.picUrl,
        songList
    );
}

export function createRankingByDetail(data){
    return new Ranking(
        data.topId,
        data.ListName,
        data.pic_album,
        []
    )
}