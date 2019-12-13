import ajax from './ajax'

export const reqRegister = (user) => ajax('/register',user,'POST')
export const reqLogin = ({username,password,type}) => ajax('/login',{username,password,type},'POST')

export const reqUpdateUser = (user) => ajax('/update',user,'POST')

export const reqUser = () => ajax('/user')

export const reqUserlist = (type) => ajax('/userlist',{type},'GET')

export const reqChatMsgList = () => ajax('/msglist')

export const reqReadChatMsg = (from) => ajax('/readmsg', {from}, 'POST')


