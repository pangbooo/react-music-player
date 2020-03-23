import { connect } from 'react-redux'
import { showPlayer, changeSong, setSongs } from '../redux/actions';
import Album from '../components/album/Album';

// const mapStateToProps = (state /*, ownProps*/) => {
//     return {}
//   }
  
  const mapDispatchToProps = (dispatch /*, ownProps*/) => ({
    showMusicPlayer: (status) => {
        dispatch(showPlayer(status))
    },
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    setSongs: (songs) => {
        dispatch(setSongs(songs))
    }
  });

  export default connect(
    null,
    mapDispatchToProps
  )(Album)