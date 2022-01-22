import cookie from 'react-cookies'
import packageJson from '../../../package.json'

const accessKey = packageJson.name + "_" + packageJson.env + "_access"

export function AccessRemoveAll() {
  cookie.remove(accessKey, { path: '/' })
}

export function AccessRemove(user) {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    return null
  } else {
    let match = false
    for (let i = 0; i < key.keyPars.length; ++i) {
      if (key.keyPars[i].user === user) {
        match = true
        key.keyPars.splice(i, 1)
        break
      }
    }
    if (match) {
      if (key.keyPars.length === 0) {
        key.currentKey.user = ""
        key.currentKey.token = ""
      } else {
        key.currentKey.user = key.keyPars[0].user
        key.currentKey.token = key.keyPars[0].token
      }
    }
    cookie.save(accessKey, key, { path: '/' })
    return key.currentKey
  }
}

export function AccessAddUser(user, token) {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    key = {currentKey: {user: user, token: token}, keyPars: [{user: user, token: token}]}
    cookie.save(accessKey, key, { path: '/' })
  } else {
    key.currentKey.user = user;
    key.currentKey.token = token;
    let match = false
    for (const v of key.keyPars) {
      if (v.user === user) {
        match = true
        break
      }
    }
    if (!match) {
      key.keyPars.push({user: user, token: token})
    }
    cookie.save(accessKey, key, { path: '/' })
  }
}

export function AccessLoadCurrentKey() {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    return null
  } else {
    return key.currentKey
  }
}

// {currentKey: {…}, keyPars: Array(2)} 'vogger_dev_access'
// {currentKey: {…}, keyPars: Array(3)} 'vogger_dev_access'

export function AccessLoadKeyPars() {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    return null
  } else {
    return key.keyPars
  }
}

export function AccessCheck(user) {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    return false
  } else {
    for (const v of key.keyPars) {
      if (v.user === user) {
        return true
      }
    }
  }
}

export function AccessSize() {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    return 0
  } else {
    return key.keyPars.length
  }
}

export function AccessShift(user) {
  let key = cookie.load(accessKey)
  if (key === undefined || key === null || key === "" || key === {}) {
    return false
  } else {
    for (let i = 0; i < key.keyPars.length; ++i) {
      if (key.keyPars[i].user === user) {
        key.currentKey.user = key.keyPars[i].user
        key.currentKey.token = key.keyPars[i].token
        cookie.save(accessKey, key, { path: '/' })
        return true
      }
    }
    return false
  }
}