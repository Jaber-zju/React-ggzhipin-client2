import React,{Component} from 'react'
import {connect} from "react-redux";
import {Route,Switch,Redirect} from "react-router-dom";
import Cookies from 'js-cookie'
import {NavBar} from "antd-mobile";

import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";

import Laobaninfo from '../laoban-info/laobaninfo'
import Dasheninfo from '../dashen-info/dasheninfo'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../component/not-found/not-found'
import NavFooter from '../../component/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'

class Main extends Component {

  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
      hide:''
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
      hide:''
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]


  componentDidMount() {
// cookie 中有userid
// redux 中的user 是空对象
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if (userid && !_id) {
      this.props.getUser() // 获取user并保存到redux 中
    }
  }

  render(){
    const userid = Cookies.get('userid')
    if (!userid){
      this.props.history.replace('/login')
    }
    const {user,unReadCount} = this.props
    if (!user._id){
      return null
    } else {
      let path = this.props.location.pathname
      if (path === '/'){
        path = getRedirectTo(user.type,user.header)
        return <Redirect to={path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    if (currentNav){
      const type = user.type
      //console.log(type)
      if (type === 'laoban'){
        navList[1].hide = true
      }else if (type === 'dashen') {
        navList[0].hide = true
      }
    }

    return (
        <div>
          {
            currentNav ? <NavBar className='myThemeColor stick-top'>{currentNav.title}</NavBar> : null
          }

          <Switch>
            {
              navList.map((nav) => <Route path={nav.path} component={nav.component} key={nav.path}/>)
            }
            <Route path='/laobaninfo' component={Laobaninfo}/>
            <Route path='/dasheninfo' component={Dasheninfo}/>
            <Route path='/chat/:userid' component={Chat}/>

            <Route component={NotFound}/>

          </Switch>

          {
            currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null
          }

        </div>
    )


  }
}

export default connect(
    state => ({user:state.user, unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)

