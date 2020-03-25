import React from 'react';
import ReactDOM from 'react-dom';
import Header from '@/components/header/Header';
import Scroll from '@/common/scroll/Scroll';
import { CSSTransition } from 'react-transition-group';
import { getAlbumInfo } from '@/api/recommend';
import { getSongVKey } from '@/api/song';
import { CODE_SUCCESS } from '../../api/config';
import * as AlbumModel from "@/model/album"
import * as SongModel from "@/model/song"
import './album.styl';

class Album extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            loading: true,
            refreshScroll: false,
            album: {},
            songs: []
        }
    }

    componentDidMount(){
        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumContainerDOM  = ReactDOM.findDOMNode(this.refs.albumContainer );
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + 'px'

        this.setState({
            show: true
        });

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

    scroll({y}){
        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumFixedBgDOM  = ReactDOM.findDOMNode(this.refs.albumFixedBg );
        let playButtonWrapperDOM = ReactDOM.findDOMNode(this.refs.playButtonWrapper)

        //scroll to top
        if(y < 0){
            if( Math.abs(y) + 55 > albumBgDOM.offsetHeight ){
                albumFixedBgDOM.style.display = 'block';
            }else{
                albumFixedBgDOM.style.display = 'none'
            }
        }else{
            let transform = `scale( ${1+y*0.004}  , ${1+y*0.004})`;
            albumBgDOM.style['webkitTransform'] = transform;
            albumBgDOM.style['transform'] = transform;
            playButtonWrapperDOM.style.marginTop = `${y}px`
        }
    }

    selectSong(song){
        this.props.setSongs([song]);
        this.props.changeCurrentSong(song);
    }

    playAll = () => {
        if(this.state.songs.length > 0){
            //添加播放列表歌曲
            this.props.setSongs(this.state.songs);
            this.props.changeCurrentSong(this.state.songs[0]);
            this.props.showMusicPlayer(true)
        }
    }

    render(){
        let album = this.state.album;
        let songs = this.state.songs.map( song => {
            return(
                <div className='song' key={song.id} onClick={this.selectSong.bind(this,song)}>
                    <div className='song-name'>{song.name}</div>
                    <div className='song-singer'>{song.singer}</div>
                </div>
            )
        })
        return(
            <CSSTransition in={this.state.show} timeout={300} classNames='translate'>
                <div className='music-album'>
                    <Header title={album.name}/>
                    <div style={{position:'relative'}}>
                        <div className='album-img' ref='albumBg' style={{backgroundImage: `url(${album.img})`}}>
                            <div className='filter'></div>
                        </div>
                        <div className='album-img fixed' ref='albumFixedBg' style={{backgroundImage: `url(${album.img})`}}>
                            <div className='filter'></div>
                        </div>
                        <div className='play-wrapper' ref='playButtonWrapper'>
                            <div className='play-button' onClick={this.playAll}>
                                <i className='icon-play'></i>
                                <span>播放全部</span>
                            </div>
                        </div>
                    </div>
                    <div ref='albumContainer' className='album-container'>
                        <div className='album-scroll' style={this.state.loading === true ? {display:"none"} : {}}>
                            <Scroll refresh={this.state.refreshScroll} onScroll={this.scroll.bind(this)}>
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
            </CSSTransition>
        )
    }
}

export default Album