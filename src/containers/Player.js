import { connect } from 'react-redux';
import Player from '../components/play/Player';
import {showPlayer, changeSong} from "../redux/actions"

const mapStateToProps = (state) => ({
    showPlayer: state.showPlayer,
    currentSong: state.song,
    playSongs: state.songs
});

const mapDispatchToProps = (dispatch) => ({
    showMusicPlayer: (status) => {
        dispatch(showPlayer(status))
    },
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    }
})

export  default connect(mapStateToProps,mapDispatchToProps)(Player)