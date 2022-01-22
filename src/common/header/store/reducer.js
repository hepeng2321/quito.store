import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import {AccessAddUser, AccessRemove} from "../../util/access";

const defaultState = fromJS ({
  login: false,
  loginUser: "",
  loginToken: "",
  domain: "",
  serverTime: 0,
  avatarPath: "",
  guestToken: "",
  me: null,
  userList: [],
  unreadUlog: 0,
  page: "",
  hasNews: false,
  chatId: "",
  chatIdGroup: ""
});

const App = (state = defaultState, action) => {

  let userListNew = []
  switch (action.type) {
    case actionTypes.HELLO:
      return state.merge({
        'login': true,
        'domain': fromJS(action.domain),
        'loginUser': fromJS(action.user),
        'loginToken': fromJS(action.token),
        'serverTime': fromJS(action.serverTime),
        'avatarPath': fromJS(action.avatarPath),
        'guestToken': fromJS(action.guestToken),
        'me': fromJS(action.me),
        'unreadUlog': fromJS(action.unreadUlog),
      });
    case actionTypes.HELLO_GUEST:
      return state.merge({
        'login': false,
        'domain': fromJS('/' + action.domain),
        'serverTime': fromJS(action.serverTime),
        'avatarPath': fromJS(action.avatarPath),
        'guestToken': fromJS(action.guestToken),
        'loginToken': fromJS(action.guestToken),
        'loginUser': fromJS('guest')
      });
    case actionTypes.LOGIN:
      AccessAddUser(action.user, action.token)
      userListNew = state.get('userList')
      if (userListNew === undefined || userListNew === null) {
        userListNew = []
      } else if (userListNew !== []) {
        userListNew = userListNew.toJS()
      }
      userListNew.push({user: action.me.Username, unreadUlog: action.unreadUlog, userInfo: action.me})
      return state.merge({
        'login': true,
        'loginUser': fromJS(action.user),
        'loginToken': fromJS(action.token),
        'domain': fromJS(action.domain),
        'serverTime': fromJS(action.serverTime),
        'avatarPath': fromJS(action.avatarPath),
        'guestToken': fromJS(action.guestToken),
        'me': fromJS(action.me),
        'userList': fromJS(userListNew),
        'unreadUlog': fromJS(action.unreadUlog),
      });
    case actionTypes.LOGOUT:
      userListNew = state.get('userList')
      if (userListNew === undefined || userListNew === null) {
        userListNew = []
      } else if (userListNew !== []) {
        userListNew = userListNew.toJS()
      }
      for (let i = 0; i < userListNew.length; ++i) {
        if (userListNew[i].user === action.user) {
          userListNew.splice(i, 1)
        }
      }
      let key = AccessRemove(action.user)
      if (key.user === "") {
        return state.merge({
          'login': false,
          'loginUser': fromJS("guest"),
          'loginToken': state.get('guestToken'),
          'me': null,
          'userList': null,
          'unreadUlog': 0,
        });
      } else {
        let me = null
        let unreadUlog = 0
        if (userListNew.length > 0) {
          for (let i = 0; i < userListNew.length; ++i) {
            if (userListNew[i].user === key.user) {
              me = userListNew[i].userInfo
              unreadUlog = userListNew[i].unreadUlog
            }
          }
        }
        return state.merge({
          'loginUser': fromJS(key.user),
          'loginToken': fromJS(key.token),
          'me': fromJS(me),
          'unreadUlog': fromJS(unreadUlog),
          'userList': fromJS(userListNew),
        });
      }
    case actionTypes.GET_USERINFO:
      userListNew = state.get('userList')
      if (userListNew === undefined || userListNew === null) {
        userListNew = []
      } else if (userListNew !== []) {
        userListNew = userListNew.toJS()
      }
      for (let i = 0; i < action.data.length; ++i) {
        let found = false
        for (let j = 0; j < userListNew.length; ++j) {
          if (action.data[i].user === userListNew[j].user) {
            found = true
            userListNew[j].unreadUlog = action.data[i].unreadUlog
            userListNew[j].userInfo = action.data[i].userInfo
          }
        }
        if (!found) {
          userListNew.push({
            user: action.data[i].user,
            unreadUlog: action.data[i].unreadUlog,
            userInfo: action.data[i].userInfo})
        }
      }
      return state.merge({
        'userList': fromJS(userListNew)
      });
    case actionTypes.SHIFT_USER:
      userListNew = state.get('userList')
      if (userListNew === undefined || userListNew === null) {
        userListNew = []
      } else if (userListNew !== []) {
        userListNew = userListNew.toJS()
      }
      for (let i = 0; i < userListNew.length; ++i) {
        if (userListNew[i].user === action.user) {
          return state.merge({
            'me': fromJS(userListNew[i].userInfo),
            'unreadUlog': fromJS(userListNew[i].unreadUlog),
            'loginUser': fromJS(action.user),
            'loginToken': fromJS(action.token)
          });
        }
      }
      return state;
    case actionTypes.GET_NOTIFICATION:
      userListNew = state.get('userList')
      if (userListNew === undefined || userListNew === null) {
        userListNew = []
      } else if (userListNew !== []) {
        userListNew = userListNew.toJS()
      }
      if (userListNew === []) {
        return state
      } else {
        for (let i = 0; i < userListNew.length; ++i) {
          for (const l of action.data) {
            if (l.user === userListNew[i].user) {
              userListNew[i].unreadUlog = l.unreadUlog
            }
          }
        }
        return state.merge({
          'userList': fromJS(userListNew)
        });
      }

    case actionTypes.PAGE:
      return state.set('page', action.page)

    case actionTypes.HAS_NEWS:
      return state.set('hasNews', true)

    case actionTypes.CLEAR_NEWS:
      return state.set('hasNews', false)

    case actionTypes.SET_CHATID:
      return state.set('chatId', action.chatId)

    case actionTypes.SET_CHATIDGROUP:
      return state.set('chatIdGroup', action.chatIdGroup)


    // case actionTypes.GET_ME:
    //   if (action.me.Username === 'guest') {
    //     return state
    //   }
    //   userListNew = state.get('userList').toJS()
    //   if (userListNew !== undefined && userListNew.length > 0) {
    //     for (let i = 0; i < userListNew.length; ++i) {
    //       if (userListNew[i].user === action.me.Username) {
    //         userListNew[i].userInfo = action.me
    //         return state.merge({
    //           'me': fromJS(action.me),
    //           'userList': fromJS(userListNew)
    //         });
    //       }
    //     }
    //     userListNew.push({user: action.me.Username, unreadUlog: 0, userInfo: action.me})
    //     return state.merge({
    //       'me': fromJS(action.me),
    //       'userList': fromJS(userListNew)
    //     });
    //   } else {
    //     userListNew = []
    //     userListNew.push({user: action.me.Username, unreadUlog: 0, userInfo: action.me})
    //     return state.merge({
    //       'me': fromJS(action.me),
    //       'userList': fromJS(userListNew)
    //     });
    //   }
    default:
      return state;
  }
}

export default App;
