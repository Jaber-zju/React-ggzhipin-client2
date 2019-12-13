import {combineReducers} from "redux";
import React from 'react'

import {AUTH_SUCCESS,
  ERROR_MSG,
    RECIEVE_USER,
    RESET_USER,
    RECIEVE_USER_LIST,
    RECIEVE_MSG_List,
    RECIEVE_MSG,
    MSG_READ
} from "./action-types";

import {getRedirectTo} from "../utils/index";

const initUser = {
  username:'',
  type:'',
  msg:'',
  redirectTo:''
}

function user(state = initUser,action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type,header} = action.data
      return {...action.data,redirectTo:getRedirectTo(type,header)}
    case ERROR_MSG:
      return {...state,msg:action.data}
    case RECIEVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser,msg:action.data}
    default:
      return state
  }
  return state
}


const initUserList = []

function userList(state = initUserList,action) {
  switch (action.type) {
    case RECIEVE_USER_LIST:
      return action.data
    default:
      return state
  }
}


const initChat = {
  chatMsgs:[],
  users:{},
  unReadCount:0
}

function chat(state = initChat, action) {
  switch (action.type) {
    case RECIEVE_MSG:
      const {chatMsg} = action.data
      return {
        chatMsgs:[...state.chatMsgs,chatMsg],
        users: state.users,
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1:0)
      }

    case RECIEVE_MSG_List:
      const {chatMsgs,users,userid} = action.data
      return {
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preTotal, msg) => { // 别人发给我的未读消息
          return preTotal + (!msg.read&&msg.to===userid ? 1 : 0)
        }, 0)
      }

    case MSG_READ:
      const {count, from, to} = action.data
      return {
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from===from && msg.to===to && !msg.read) {
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount-count
      }

    default:
      return state

  }
}

export default combineReducers({
  user,
  userList,
  chat

})