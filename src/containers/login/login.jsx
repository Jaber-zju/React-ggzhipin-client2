import React,{Component} from 'react'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'


import Logo from '../../component/logo/logo'
import {login} from "../../redux/actions";


import {NavBar,List,InputItem,Button,WingBlank,WhiteSpace} from "antd-mobile";

class Login extends Component {
  state = {
    password:'',
    username:''
  }

  handleChange = (name,value) => {
    this.setState({
      [name]:value
    })
  }

  login = () => {
    this.props.login(this.state)
  }

  enterLogin = (event) => {
    if (event.keyCode === 13) {
      this.props.login(this.state)
    }
  }

  toRegister = () => {
    this.props.history.push('/register')
  }

  render(){
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
              <InputItem
                  type="password"
                  placeholder='请输入密码'
                  maxLength={20}
                  onChange={value => this.handleChange('password',value)}
                  onKeyUp={this.enterLogin}
              >
                密&nbsp;&nbsp;&nbsp;码：
              </InputItem>
              <WhiteSpace/>
              <Button type='primary' className='myThemeColor' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
              <Button onClick={this.toRegister}>还没有账号</Button>
            </List>

        </div>
    )


  }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)

