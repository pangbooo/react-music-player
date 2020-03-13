import React from 'react';
import './loading.styl';
import loadingImg from "./loading.gif"

class Loading extends React.Component{
    render(){
        let displayStyle = this.props.show === true ? 
            {display:''} : {display: 'none'}

        return(
            <div className='loading-container' style={displayStyle}>
                <div className='loading-wrapper'>
                    <img src={loadingImg} width='18px' height='18px' alt='loading'/>
                    <div className='loadgin-title'>{this.props.title}</div>
                </div>
            </div>
        )
    }
}

export default Loading