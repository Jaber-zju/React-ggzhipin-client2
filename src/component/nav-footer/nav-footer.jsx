import React,{Component} from 'react'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'

const TabBarItem = TabBar.Item

class NavFooter extends Component {
  static propTypes = {
    navList:PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }

  render(){

    let {navList} = this.props
    navList = navList.filter(nav => !nav.hide)

    const path = this.props.location.pathname

    return (

          <TabBar
              unselectedTintColor="#949494"
              tintColor="#1DA57A"
              barTintColor="white"
              className='am-tab-bar'
          >
            {
              navList.map((nav,index) => (
                  <TabBarItem
                      badge={nav.path === '/message' ? this.props.unReadCount : 0}
                      key={nav.path}
                      title={nav.text}
                      icon={{uri:require(`./images/${nav.icon}.png`)}}
                      selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                      selected={path===nav.path}
                      onPress={() => {
                        this.props.history.replace(nav.path)
                      }}
                  />
                  ))
               }
          </TabBar>
    )
  }
}

export default withRouter(NavFooter)

