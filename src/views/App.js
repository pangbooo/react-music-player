import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import router from '../router/router'
import logo from '../assets/imgs/logo.png';
import '../assets/stylus/reset.styl';
import '../assets/stylus/font.styl'
import './App.styl';

import MusicPlayer from "./play/MusicPlayer"
import MusicMenu from "./setting/Menu"


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        menuShow: false
    };
  }

  render(){
    return (
      <Router>
        <div className="app skin-app">
          <header className='app-header skin-app-header'>
              <i className="icon-et-more app-more" onClick={() => {this.setState({menuShow: true});}}></i>
              <img src={logo} className='app-logo' alt='app-logo'/>
              <h1 className='app-title'>Mango Music</h1>
          </header>
          <div className='music-tab skin-music-tab'>
            <div className='tab-item selected'>
                <NavLink to='/recommend' className='nav-link'>
                  <span>推荐</span>
                </NavLink>
            </div>
            <div className='tab-item'>
              <NavLink to='/ranking' className='nav-link'>
                <span>排行榜</span>
              </NavLink>
            </div>
            <div className='tab-item'>
                <NavLink to='/singer' className='nav-link'>
                  <span>歌手</span>
                </NavLink>
            </div>
            <div className='tab-item'>
                <NavLink to='/search' className='nav-link'>
                  <span>搜索</span>
                </NavLink>
            </div>
          </div>
  
          <div className='music-view'>
            {/* 
              Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
              Redirect重定向到列表页
            */}
            {/* 
              Redirect exact 与Route的exact 意义相同
            */}
            <Switch>
                <Redirect from='/' to='/recommend' exact/>
                {/* 渲染Route */}
                { renderRoutes(router) }
            </Switch>
          </div>
          <MusicPlayer />
          <MusicMenu show={this.state.menuShow} closeMenu={() => {this.setState({menuShow: false})}}/>
        </div>
        </Router>
    );
  }
  
}

export default App;
