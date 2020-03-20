import React from 'react';
import './album.styl';
import Header from '@/components/header/Header';
import Scroll from '@/common/scroll/Scroll';
import Loading from '@/common/loading/Loading';
import { getAlbumInfo } from '@/api/recommend';
import { getSongVKey } from '@/api/song';
import { CODE_SUCCESS } from '../../api/config';
import * as AlbumModel from "@/model/album"
import * as SongModel from "@/model/song"

class Album extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            refreshScroll: false,
            album: {},
            songs: []
        }
    }

    componentDidMount(){
        let albumMid = this.props.match.params.id;

        getAlbumInfo(albumMid).then((res) => {
            console.log("获取专辑详情：");
            if(res){
                console.log(res);
                if(res.code === CODE_SUCCESS){
                    
                    let album = AlbumModel.createAlbumByDetail(res.data);
                    album.desc = res.data.desc;
                    
                    let songList = res.data.list;
                    let songs = [];
                    songList.forEach( item => {
                        let song = SongModel.createSong(item);
                        //获取歌曲vkey
                        this.getSongUrl(song, item.songmid);
                        songs.push(song);
                    });

                    this.setState({
                        album,
                        songs,
                        loading: false
                    },() => {
                        //刷新scroll
                        this.setState({
                            refreshScroll: true
                        })
                    })
                }
            }
        })
    }

    getSongUrl(song, mId){
        getSongVKey(mId).then(res => {
            console.log('getSongVKey.......', res)
            if(res){
                if(res.code === CODE_SUCCESS){
                    if(res.data.items){
                        let item = res.data.items[0];
                        song.url =  `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
                    }
                }
            }
        })
    }

    render(){
        let album = this.state.album;
        let songs = this.state.songs.map( song => {
            return(
                <div className='song' key={song.id}>
                    <div className='song-name'>{song.name}</div>
                    <div className='song-singer'>{song.singer}</div>
                </div>
            )
        })
        return(
            <div className='music-album'>
                <Header title={album.name}/>
                <div style={{position:'relative'}}>
                    <div className='album-img' ref='album-img' style={{backgroundImage: `url(${album.img})`}}>
                        <div className='filter'></div>
                    </div>
                    <div className='album-img fixed' ref='albumFixedBg' style={{backgroundImage: `url(${album.img})`}}>
                        <div className='filter'></div>
                    </div>
                    <div className='play-wrapper' ref='playButtonWrapper'>
                        <div className='play-button'>
                            <i className='icon-play'></i>
                            <span>播放全部</span>
                        </div>
                    </div>
                </div>
                <div ref='albumContainer' className='album-container'>
                    <div className='album-scroll' style={this.state.loading === true ? {display:"none"} : {}}>
                        <Scroll refresh={this.state.refreshScroll}>
                            <div className='album-wrapper'>
                                <div className="song-count">专辑 共{songs.length}首</div>
                                <div className="song-list">
                                    {songs}
                                </div>
                                <div className="album-info" style={album.desc? {} : {display:"none"}}>
                                    <h1 className="album-title">专辑简介</h1>
                                    <div className="album-desc">
                                        {album.desc}
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                </div>
            </div>
        )
    }
}

export default Album