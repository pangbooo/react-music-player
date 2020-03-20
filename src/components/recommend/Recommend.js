import React from "react";
import {Route} from 'react-router-dom'
import Swiper from 'swiper';
import "swiper/dist/css/swiper.css"
import "./recommend.styl";
import LazyLoad, { forceCheck } from 'react-lazyload';
import Scroll from '@/common/scroll/Scroll'
import Loading from '@/common/loading/Loading';
import * as AlbumModel from '@/model/album';
import { getCarousel, geNewAlbum } from "@/api/recommend"
import { CODE_SUCCESS } from "@/api/config"

import Album from '../album/Album'


class Recommend extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            sliderList: [],
            newAlbums: [],
            refreshScroll: false
        }
    }

    componentDidMount(){
        getCarousel().then((res) => {
            console.log('获取轮播')
            if(res){
                console.log(res);
                if(res.code === CODE_SUCCESS){
                    this.setState({
                        sliderList: res.MusicHallDigitalAlbum.data.focus
                    }, () => {
                        if(!this.slideSwiper){
                            //初始化轮播图
                            this.slideSwiper = new Swiper(".slider-container", {
                                loop: true,
                                autoplay: 3000,
                                autoplayDisableOnInteraction: false,
                                pagination: '.swiper-pagination'
                            })
                        }
                    })
                }
            }
        });

        geNewAlbum().then(res => {
            console.log('获取最新专辑');
            if(res){
                console.log(res);
                if(res.code === CODE_SUCCESS){
                    //根据发布时间降序排列
                    let albumList = res.albumlib.data.list;
                    albumList.sort((a, b) => {
                        return new Date(b.public_time).getTime() - new Date(a.public_time).getTime()
                    });
                    this.setState({
                        newAlbums: albumList,
                        loading: false
                    }, ()=> {
                        //刷新scroll
                        this.setState({
                            refreshScroll: true
                        })
                    })
                }
            }
        })

    }

    toAlbumDetail(url){
        // scroll 组件会派发一个点击事件，不能使用链接跳转
        this.props.history.push({
            pathname: url
        })
    }

    render() {
        let { match } = this.props;
        let albums = this.state.newAlbums.map(item => {
            //通过函数创建专辑对象
            let album = AlbumModel.createAlbumByList(item);
            return (
                <div className='album-wrapper' key={album.mId} onClick={this.toAlbumDetail.bind(this,`${match.url}/${album.mId}`)}> 
                    <div className='left'>
                        <LazyLoad>
                            <img src={album.img} width='100%' height='100%' alt={album.name} />
                        </LazyLoad>
                    </div>
                    <div className='right'>
                        <div className='album-name'>{album.name}</div>
                        <div className='singer-name'>{album.singer}</div>
                        <div className='public—time'>{album.publicTime}</div>
                    </div>
                </div>
            )
        })


        return (
            <div className="music-recommend">
                <Scroll refresh={this.state.refreshScroll} onScroll={() => {forceCheck();}}>
                    <div>
                        <div className='slider-container'>
                            <div className='swiper-wrapper'>
                                {
                                    this.state.sliderList.map(slider => {
                                        return (
                                            <div className='swiper-slide' key={slider.album_id}>
                                                <a className="slider-nav" >
                                                    <img src={slider.picurl} width="100%" height="100%" alt="推荐"/>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='swiper-pagination'></div>
                        </div>

                        <div className='album-container'>
                            <h1 className='title'>最新专辑</h1>
                            <div className='album-list'>
                                {albums}
                            </div>
                        </div>
                    </div>
                </Scroll>
                <Loading show={this.state.loading}/>
                <Route path={`${match.url + '/:id'}`} component={Album}/>
            </div>
        );
    }
}

export default Recommend
