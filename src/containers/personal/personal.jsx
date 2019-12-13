import React,{Component} from 'react'
import {connect} from "react-redux";
import Cookies from 'js-cookie'
import {Result,Button,List,Modal,WingBlank} from "antd-mobile";

import {resetUser} from "../../redux/actions";

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

class Personal extends Component {

  logout = () => {
    alert('退出登录', '确定要退出登录吗', [
      { text: '取消', onPress: () => console.log('取消') },
      { text: '确定', onPress: () => {
          Cookies.remove('userid')
          this.props.resetUser()
          }
        },
    ])

  }

  render(){
    const {user} = this.props

    return (
        <div style={{marginTop:50,marginBottom:50}}>
          <Result img={<img src={require(`../../assets/images/${user.header}.png`)}/> } title={user.username} message={user.company || ''}/>
          <List renderHeader={() => '相关信息'}>
              <Item multipleLine>
                <Brief>职位：{user.post}</Brief>
                <Brief>简介：{user.info}</Brief>
                <Brief>薪资：{user.salary}</Brief>
              </Item>
          </List>
          <Button className='myThemeColor' type='primary' onClick={this.logout}>退出登录</Button>
        </div>
    )


  }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)

