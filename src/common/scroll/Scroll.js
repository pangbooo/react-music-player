import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './scroll.styl';

class Scroll extends React.Component{
    componentDidUpdate(){
        if(this.bScroll && this.props.refresh === true){
            this.bScroll.refresh();
        }
    }
    componentDidMount(){
        this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView);
        if(!this.bScroll){
            this.bScroll = new BScroll(this.scrollView, {
                //实时派发scroll事件
                probeType: 3,
                click: this.props.click,
                scrollX: this.props.direction === 'horizontal',
                scrolly: this.props.direction === 'vertical',
            })

            if(this.props.onScroll){
                this.bScroll.on('scroll', (scroll) => {
                    this.props.onScroll(scroll)
                })
            }
        }
    }
    componentWillUnmount(){
        this.bScroll.off('scroll');
        this.bScroll = null;
    }

    render(){
        return(
            <div className='scroll-view' ref="scrollView">
                {/*获取子组件*/}
                {this.props.children}
            </div>
        )
    }
}

Scroll.defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: false,
    onScroll: null
}

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func
}

export default Scroll