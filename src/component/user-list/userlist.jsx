/*
用户列表的UI 组件
*/
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';

import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }


  render() {
    const {userList} = this.props
    return (
        <WingBlank style={{marginBottom:50,marginTop:45}} >
          <QueueAnim type='scale'>
            {
              userList.map(user => (
                  <div key={user._id}>
                    <WhiteSpace/>
                    <Card onClick={() => {
                      console.log(user._id)
                      this.props.history.push(`/chat/${user._id}`)
                    }}>
                      <Header
                          thumb={user.header ? require(`../../assets/images/${user.header}.png`) : null}
                          title={user.username}
                          extra={user.company ? <span>{user.company}</span> : null}
                      />
                      <Body>
                        <div>职位: {user.post}</div>
                        {user.company ? <div>公司: {user.company}</div> : null}
                        {user.type === 'laoban' ? <div>职位薪资: {user.salary}</div> : <div>期待薪资: {user.salary}</div>}
                        <div>简介: {user.info}</div>
                      </Body>
                    </Card>
                  </div>
              ))
            }
          </QueueAnim>

        </WingBlank>
    )
  }
}
export default withRouter(UserList)