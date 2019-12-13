import React,{Component} from 'react'
import {connect} from "react-redux";

import UserList from '../../component/user-list/userlist'
import {getUserList} from "../../redux/actions";

class Dashen extends Component {

  componentDidMount() {
    this.props.getUserList('laoban')
  }

  render(){
    return (
        <div style={{marginTop:40,marginBottom:50}}>
          <UserList userList={this.props.userList}/>
        </div>
    )
  }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Dashen)

