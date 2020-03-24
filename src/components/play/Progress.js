import React from "react"
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import "./progress.styl"

class Progress extends React.Component {
    componentDidUpdate() {
        //组件更新后重新获取进度条总宽度
        // if (!this.progressBarWidth) {
        //     this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth;
        // }
    }
    componentDidMount() {
        let {disableButton, disableDrag, onDragStart, onDrag, onDragEnd} = this.props;
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

                touch.target.style.left = btnLeft + 'px'; //设置按钮left值
                progressDOM.style.width = btnLeft / this.progressBarWidth * 100 + '%'; //设置进度width值
                
                if(onDrag){
                    onDrag(btnLeft / this.progressBarWidth )
                }
            });

            progressButtonDOM.addEventListener('touchend', (e) => {
                if(onDragEnd){
                    onDragEnd()
                }
            });
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
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func
}

export default Progress