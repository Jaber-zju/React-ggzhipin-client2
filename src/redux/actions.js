import io from 'socket.io-client'

import {AUTH_SUCCESS,
        ERROR_MSG,
    RECIEVE_USER,
    RESET_USER,
    RECIEVE_USER_LIST,
    RECIEVE_MSG_List,
    RECIEVE_MSG,
    MSG_READ
} from "./action-types";

import {reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserlist,
    reqChatMsgList,
    reqReadChatMsg
} from "../api/index";



//同步方法
export const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
export const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
export const recieveUser = (user) => ({type:RECIEVE_USER,data:user})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
export const recieveUserList = (userlist) => ({type:RECIEVE_USER_LIST,data:userlist})

const recieveMsgList = ({users, chatMsgs, userid}) => ({type: RECIEVE_MSG_List, data:{users, chatMsgs, userid}})
const recieveMsg = (chatMsg,userid) => ({type:RECIEVE_MSG, data:{chatMsg,userid}})
const msgRead = ({count,from,to}) => ({type:MSG_READ, data:{count,from,to}})

function initIO(dispatch,userid) {
  if (!io.socket){
    io.socket = io('ws://localhost:4000')
    io.socket.on('recieveMsg',(chatMsg) => {
      if (chatMsg.from === userid || chatMsg.to === userid){
        dispatch(recieveMsg(chatMsg,userid))
      }
    })
  }
}

//异步方法

//异步注册
export const register = (user) => {
  const {username,password,password2,type} = user
  // 进行前台表单验证, 如果不合法返回一个同步action 对象, 显示提示信息
  if (!username || !password || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (password !== password2) {
    return errorMsg('密码和确认密码必须一致')
  }

  return async dispatch => {
    const response = await reqRegister({username,password,type})
    const result = response.data
    if (result.code === 0){
      getMsgList(dispatch, result.data._id)
      dispatch (authSuccess(result.data))
    } else if (result.code === 1){
      dispatch (errorMsg(result.msg))
    }
  }
}

//异步登录
export const login = ({username,password}) => {
  // 进行前台表单验证, 如果不合法返回一个同步action 对象, 显示提示信息
  if (!username || !password) {
    return errorMsg('用户密码必须输入')
  }

  return async dispatch => {
    const response = await reqLogin({username,password})
    const result = response.data
    if (result.code === 0){
      getMsgList(dispatch, result.data._id)
      dispatch (authSuccess(result.data))
    } else if (result.code === 1){
      dispatch (errorMsg(result.msg))
    }
  }
}


//异步更新用户信息
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0){
      dispatch (recieveUser(result.data))
    } else if (result.code === 1){
      dispatch (resetUser(result.msg))
    }
  }
}


//异步获取用户信息
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0){
      getMsgList(dispatch, result.data._id)
      dispatch (recieveUser(result.data))
    } else if (result.code === 1){
      dispatch (resetUser(result.msg))
    }
  }
}


//异步获取用户列表
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserlist(type)
    const result = response.data
    if (result.code === 0){
      dispatch (recieveUserList(result.data))
    } else if (result.code === 1){
      dispatch (errorMsg(result.msg))
    }
  }
}


//获取消息列表
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code === 0) {
    const {users, chatMsgs} = result.data
    // 分发同步action
    dispatch(recieveMsgList({users, chatMsgs, userid}))
  }
}


//异步发送信息
export const sendMsg = ({from,to,content}) => {
  return dispatch => {
    console.log('客户端向服务器发送消息', {from, to, content})
    io.socket.emit('sendMsg',{from,to,content})
  }
}


// 更新读取消息的异步action
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadChatMsg(from)
    const result = response.data
    if(result.code===0) {
      const count = result.data
      dispatch(msgRead({count, from, to}))
    }
  }
}