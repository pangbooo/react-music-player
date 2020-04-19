import { combineReducers } from 'redux';
import * as ActionTypes from'./actionTypes';

import localStorage from '@/util/storage'

const initialState = {
    showStatus: false, //显示状态
    song: localStorage.getCurrentSong(), //当前歌曲
    songs: localStorage.getSongs(), //歌曲列表
    skin: localStorage.getSkin()
}

//拆分Reducer
//显示或隐藏播放状态
function showStatus(showStatus=initialState.showStatus, action){
    switch(action.type){
        case ActionTypes.SHOW_PLAYER:
            return action.showStatus;
        default: 
            return showStatus
        
    }
}

//修改当前歌曲
function song(song=initialState.song, action){
    switch(action.type){
        case ActionTypes.CHANGE_SONG:
            localStorage.setCurrentSong(song);
            return action.song;
        default: 
            return song;
    }
}

//添加或移除歌曲
function songs(songs=initialState.songs, action){
    switch(action.type){
        case ActionTypes.SET_SONGS:
            localStorage.setSongs(songs);
            return action.songs;
        case ActionTypes.REMOVE_SONG_FROM_LIST:
            let newSongs = songs.filter(song => song.id !== action.id);
            localStorage.setSongs(newSongs);
            return newSongs
        default: 
            return songs;
    }
}

//设置皮肤
function skin(skin=initialState.skin, action){
    switch(action.type){
        case ActionTypes.SET_SKIN:
            localStorage.setSkin(action.skin);
            return action.skin;
            break;
        default: 
            return skin;
    }
}

const reducer = combineReducers({
    showStatus,
    song,
    songs,
    skin
});

export default reducer;

