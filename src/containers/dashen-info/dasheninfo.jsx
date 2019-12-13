import React,{Component} from 'react'
import {connect} from "react-redux";

import {NavBar, List, InputItem, WhiteSpace, Button,TextareaItem} from "antd-mobile";
import SetHeader from '../../component/setHeader/setHeader'

import {updateUser} from "../../redux/actions";
import {Redirect} from 'react-router-dom'

class Dasheninfo extends Component {

  state = {
    header: '', // 头像名称
    post: '', // 职位
    info: '', // 个人或职位简介
    salary: '' // 月薪
  }

  save = () => {
    console.log('ok');
    this.props.updateUser(this.state)
  }

  handleChange = (name,val) => {
    this.setState({
      [name]:val
    })
  }

  setHeader = (header) => {
    this.setState({header})
  }


  render(){
    const {header,type} = this.props.user
    if (header){
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }
    return (
        <div>
          <NavBar mode='dark' className='myThemeColor'>硅&nbsp;&nbsp;谷&nbsp;&nbsp;直&nbsp;&nbsp;聘</NavBar>
          <SetHeader setHeader={this.setHeader}/>

          <List>
            <InputItem placeholder='请输入应聘职位' maxLength={20} onChange={value => this.handleChange('post',value)}>应聘职位：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入期待薪资' maxLength={20} onChange={value => this.handleChange('salary',value)}>期待薪资：</InputItem>
            <WhiteSpace/>
            <TextareaItem title='个人介绍：' placeholder='请输入个人介绍' rows={3} onChange={value => this.handleChange('info',value)}/>
            <WhiteSpace/>

            <Button type='primary' className='myThemeColor' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
          </List>
        </div>
    )


  }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(Dasheninfo)

