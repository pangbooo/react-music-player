import React from "react"
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import "./progress.styl"

class Progress extends React.Component {
    componentDidUpdate() {

    }
    componentDidMount() {
        let {disableButton, disableDrag, onDragStart, onDragDrag, onDragEnd} = this.props;
        let progressBarDOM = ReactDom.findDOMNode(this.refs.progressBar);
        let progressDOM = ReactDom.findDOMNode(this.refs.progress);
        let progressButtonDOM = ReactDom.findDOMNode(this.refs.progressButton);
        this.progressBarWidth = progressBar.offsetWidth;

        if(disableButton !== true && disableDrag !== true){
            let downX = 0; //触摸开始的位置
            let buttonLeft = 0; //按钮left的值

            progressButtonDOM.addEventListener('touchstart', (e) => {
                let touch = e.touches[0];
                downX = touch.clientX;
                buttonLeft = parseInt(touch.target.style.left, 10);

                if(onDragStart){
                    onDragStart();
                }
            });

            progressButtonDOM.addEventListener('touchmove', (e) => {
                e.preventDefault();

                let touch = e.touches[0];
                let diffX = touch.clientX - downX;

                let btnLeft = buttonLeft + diffX;

                if(btnLeft > this.progressBarWidth){
                    btnLeft = this.progressBarWidth
                }else if(btnLeft < 0){
                    btnLeft = 0;
                }

            })
        }

    }
    render(){
        //进度值：范围 0-1
        let {progress, disableButton} = this.props;
        if(!progerss) progerss = 0;

        //button left value
        let progressButtonOffsetLeft = 0;
        if(this.progressBarWidth){
            progressButtonOffsetLeft = progress * this.progressBarWidth;
        }

        return(
            <div className='progress-bar' ref="progressBar">
                <div className="progress-load"></div>
                <div className='progress' style={{width:`${progerss*100}%`}} ref='progress'></div>
                {
                    disableButton === true ? '' :
                    <div className='progress-button' style={{left:`${progressButtonOffsetLeft}px`}} ref='progressButton'></div>
                }
            </div>
        )
    }
}

Progress.PropTypes = {
    progress: PropTypes.number.isRequired,
    disableButton: PropTypes.bool,
    disableDrag: PropTypes.bool.isRequired.bind,
    onDragStart: PropTypes.func,
    onDragDrag: PropTypes.func,
    onDragEnd: PropTypes.func
}

export default Progress