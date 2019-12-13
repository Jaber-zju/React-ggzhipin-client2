import React,{Component} from 'react'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'

import {NavBar,List,InputItem,Button,WingBlank,WhiteSpace,Radio} from "antd-mobile";
import ListItem from "antd-mobile/es/list/ListItem";

import {register} from "../../redux/actions";


class Register extends Component {
  state = {
    password:'',
    username:'',
    password2:'',
    type:'laoban'
  }

  handleChange = (name,value) => {
    this.setState({
      [name]:value
    })
  }

  register = () => {
    //console.log(this.state.username)
    this.props.register(this.state)
  }

  enterRegister = (event) => {
    if (event.keyCode === 13) {
      this.props.register(this.state)
    }
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render(){
    const {type} = this.state
    //console.log(type)

    const {redirectTo,msg} = this.props.user
    if (redirectTo){
      return <Redirect to={redirectTo}/>
    }

    return (
        <div>
          <NavBar className='myThemeColor'>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
          <Logo/>

            {msg ? <p className='error-msg'>{msg}</p> : null}
            <List>
              <InputItem placeholder='请输入用户名' maxLength={20} onChange={value => this.handleChange('username',value)}>用户名：</InputItem>
              <WhiteSpace/>
              <InputItem type="password" placeholder='请输入密码' maxLength={20} onChange={value => this.handleChange('password',value)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
              <WhiteSpace/>
              <InputItem
                  type="password"
                  placeholder='请再次输入密码'
                  maxLength={20}
                  onChange={value => this.handleChange('password2',value)}
                  onKeyUp={this.enterRegister}
              >
                确认密码：
              </InputItem>
              <WhiteSpace/>

              <ListItem>
                <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
                <Radio className="my-radio" checked = {type==='laoban'} onChange={value => this.handleChange('type','laoban')}>&nbsp;老板&nbsp;&nbsp;&nbsp;</Radio>
                <Radio className="my-radio" checked = {type==='dashen'} onChange={value => this.handleChange('type', 'dashen')}>&nbsp;大神&nbsp;&nbsp;</Radio>
              </ListItem>
              <WhiteSpace/>

              <Button type='primary' className='myThemeColor' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
              <Button onClick={this.toLogin}>已有账号</Button>
            </List>

        </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)

