'use strict'

module.exports = (options) => {
  const firebase = require('firebase')
  const app = firebase.initializeApp({
    apiKey: options.apiKey,
    authDomain: options.authDomain,
    databaseURL: options.databaseURL
  }, options.appName)

  if (options.authEmail && options.authPassword) {
    app.auth().signInWithEmailAndPassword(options.authEmail, options.authPassword).catch(error => {
      return error
    })
  }

  const database = app.database()

  const add = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const value = parseInt(args.value || 1, 10)
      const valueRef = database.ref(selectedKey)
      valueRef.transaction((currentVal) => {
        return currentVal + value
      }, (error, committed, snapshot) => {
        if (error) {
          if (callback) {
            return callback(error, null)
          }
          reject(error)
        } else {
          const result = { key: selectedKey, value: snapshot.val() }
          if (callback) {
            return callback(null, result)
          }
          resolve(result)
        }
      })
    })
  }

  const subtract = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      const value = parseInt(args.value || 1, 10)
      const valueRef = database.ref(selectedKey)
      valueRef.transaction((currentVal) => {
        return currentVal - value
      }, (error, committed, snapshot) => {
        if (error) {
          if (callback) {
            return callback(error, null)
          }
          reject(error)
        } else {
          const result = { key: selectedKey, value: snapshot.val() }
          if (callback) {
            return callback(null, result)
          }
          resolve(result)
        }
      })
    })
  }

  const lookup = (args, callback) => {
    return new Promise((resolve, reject) => {
      const selectedKey = args.key || 'value'
      database.ref(selectedKey).once('value').then((snapshot) => {
        const value = snapshot.val()
        const result = { key: selectedKey, value: value }
        if (callback) {
          return result
        }
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  return {
    add: add,
    subtract: subtract,
    lookup: lookup
  }
}
