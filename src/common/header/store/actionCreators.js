import * as actionTypes from './actionTypes';
import axios from 'axios';
import {Timeout} from "../../util/url";

const login = (user, token, helloRes, me, unreadUlog) => ({
  type: actionTypes.LOGIN,
  domain: helloRes.Domain,
  serverTime: helloRes.TimeStamp,
  avatarPath: helloRes.Avatar,
  guestToken: helloRes.OncetimeUser,
  me: me,
  user: user,
  token: token,
  unreadUlog: unreadUlog
})

export const logout = (user) => ({
  type: actionTypes.LOGOUT,
  user: user
})

export const loginAPI = (domain, u, pw) => {

  if (u === "golden") {
    pw = "01150473089f04d3b3403ce0b60a251010e5ca651e03df8ded7d1828e0b76545"
  } else if (u === "007") {
    pw = "378a1cace218097c19109fcc49233e4b82a50980a1f18e3bd706930f77a6849b"
  } else if (u === "elon") {
    pw = "8dc0efc9dd44747504be36d9fb7a03e8301eadcccb1253bf5edc60f89fdf50ad"
  } else if (u === "eden") {
    pw = "d6471dc891cee1388b7f36644b2b7f9c4ce8d9883b511b8c3ee24a6985fbdc1f"
  }

  return (dispatch) => {

    let loginData = {
      'user': u,
      'pw': pw
    }

    const instanceLogin = axios.create({
      baseURL: '/api/' + domain + '/vgr1/login',
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return new Promise((resolve, reject) => {
      instanceLogin.post('', loginData)
        .then((res) => {
          console.log("loginAPI", res)
          if (res.data.Code === 0) {

            const instanceConfirm = axios.create({
              baseURL: '/api/' + domain + '/vgr1/confirm',
              timeout: Timeout,
              headers: {
                'Content-Type': 'application/json',
              }
            });

            let confirmData = {
              "token": res.data.Body.Token,
              "code": res.data.Body.Code,
            }

            return new Promise((resolve, reject) => {
              instanceConfirm.post('', confirmData)
                .then((res) => {
                  console.log("confirmAPI", res)
                  if (res.data.Code === 0) {
                    let user = res.data.Body.User
                    let token = res.data.Body.Token
                    // dispatch(login(user, token))
                    // helloAPI(user, token)

                    const instanceHello = axios.create({
                      baseURL: '/api/' + domain + '/vgr1/hello',
                      timeout: Timeout,
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                      }
                    });

                    return new Promise((resolve, reject) => {
                      instanceHello.get('')
                        .then((res) => {
                          console.log("helloAPI - login", res)
                          const helloRes = res.data.Body

                          let reqList = []
                          let req1 = axios.get(
                            '/api/' + helloRes.Domain + '/vgr1/tweetuser',
                            {
                              timeout: Timeout,
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                              }
                            })
                          reqList.push(req1)
                          let req2 = axios.get(
                            '/api/' + helloRes.Domain + '/vgr1/unreadulog',
                            {
                              timeout: Timeout,
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                              }
                            })
                          reqList.push(req2)

                          return axios.all(reqList).then(axios.spread(function (...resList) {
                            console.log("getMeAPI and getUnreadUlogAPI - login ", resList)
                            const me = resList[0].data.Body
                            const unreadUlog = resList[1].data.Body
                            dispatch(login(user, token, helloRes, me, unreadUlog))
                          }))

                        })
                        .catch((e) => {
                          reject(e)
                        })
                    })
                  } else {
                    console.log("confirmAPI ERROR", res.data.Msg)
                  }
                })
                .catch((e) => {
                  reject(e)
                })
            })
          } else {
            console.log("loginAPI ERROR", res.data.Msg)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};

const hello = (user, token, helloRes, me, unreadUlog) => ({
  type: actionTypes.HELLO,
  domain: helloRes.Domain,
  serverTime: helloRes.TimeStamp,
  avatarPath: helloRes.Avatar,
  guestToken: helloRes.OncetimeUser,
  me: me,
  unreadUlog: unreadUlog,
  user: user,
  token: token
})

export const helloAPI = (user, token) => {

  return (dispatch) => {

    const instance = axios.create({
      baseURL: '/api/vapi/vgr1/hello?token=' + token,
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("helloAPI", res)

          if (res.data.Code === 1) {
            dispatch(logout(user))
          } else {

            const helloRes = res.data.Body

            let reqList = []
            let req1 = axios.get(
              '/api/' + helloRes.Domain + '/vgr1/tweetuser',
              {
                timeout: Timeout,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
              })
            reqList.push(req1)
            let req2 = axios.get(
              '/api/' + helloRes.Domain + '/vgr1/unreadulog',
              {
                timeout: Timeout,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
              })
            reqList.push(req2)

            return axios.all(reqList).then(axios.spread(function (...resList) {
              console.log("getMeAPI and getUnreadUlogAPI - hello", resList)
              const me = resList[0].data.Body
              const unreadUlog = resList[1].data.Body
              dispatch(hello(user, token, helloRes, me, unreadUlog))
            }))
          }
        })
    })

  }

};

const getUserInfo = (data) => ({
  type: actionTypes.GET_USERINFO,
  data: data,
})

export const getUserInfoAPI = (token, domain, keys) => {

  return (dispatch) => {

    let reqList = []
    for (const key of keys) {
      let req = axios.get(
        '/api/' + domain + '/vgr1/tweetuser?u=' + key.user,
        {
          timeout: Timeout,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': key.token
          }
        })
      reqList.push(req)
    }

    return axios.all(reqList).then(axios.spread(function(...resList) {
      console.log("getUserInfoAPI", resList)

      let reqListUlog = []
      for (const key of keys) {
        let req = axios.get(
          '/api/' + domain + '/vgr1/unreadulog',
          {
            timeout: Timeout,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': key.token
            }
          })
        reqListUlog.push(req)
      }

      return axios.all(reqListUlog).then(axios.spread(function(...resListUlog) {
        console.log("getUnreadUlogAPI - UserInfoAPI", resListUlog)
        let res = []
        for (let i = 0; i < keys.length; ++i) {
          let unreadUlog = resListUlog[i].data.Body
          let userInfo =  resList[i].data.Body
          res.push({user: keys[i].user, unreadUlog: unreadUlog, userInfo: userInfo})
        }
        dispatch(getUserInfo(res))
      }))
    }))

  }

};
