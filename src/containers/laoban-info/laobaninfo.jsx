import React,{Component} from 'react'
import {connect} from "react-redux";

import {NavBar, List, InputItem, WhiteSpace, Button, TextareaItem,} from "antd-mobile";
import {Redirect} from 'react-router-dom'
import SetHeader from '../../component/setHeader/setHeader'

import {updateUser} from "../../redux/actions";

class Laobaninfo extends Component {

  state = {
    header: '', // 头像名称
    post: '', // 职位
    info: '', // 个人或职位简介
    company: '', // 公司名称
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
            <InputItem placeholder='请输入招聘职位' maxLength={20} onChange={value => this.handleChange('post',value)}>招聘职位：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入公司名称' maxLength={20} onChange={value => this.handleChange('company',value)}>公司名称：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入职位薪资' maxLength={20} onChange={value => this.handleChange('salary',value)}>职位薪资：</InputItem>

            <TextareaItem title='职位要求：' placeholder='请输入职位要求' rows={2} onChange={value => this.handleChange('info',value)}/>

            <Button type='primary' className='myThemeColor' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
          </List>
        </div>
    )


  }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(Laobaninfo)

