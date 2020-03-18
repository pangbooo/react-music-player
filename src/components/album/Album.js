import React from 'react';
import './album.styl';

class Album extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='music-album'>
                Album
            </div>
        )
    }
}

export default Album