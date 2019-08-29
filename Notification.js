const inquirer = require('inquirer')
const moment = require('moment')
const schemes = require('./schemes')

class Notification {
  constructor (options = {
    title: 'Test',
    body: 'This is a test.',
    data: {
      url: '/calendar'
    },
    tag: 'test',
    renotify: true
  }) {
    options.tag = options.tag || moment().format('M/D-H:mm')
    this._title = options.title
    options.title = undefined
    this._options = options
  }

  get json () {
    return {
      title: this._title,
      options: this._options
    }
  }

  confirm () {
    console.log('Current Notification:')
    console.log(JSON.stringify(this.json, null, 2))
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmation',
          message: 'Send the notification?',
          default: false
        }
      ])
        .then(({ confirmation }) => {
          if (confirmation) {
            resolve(this.json)
          } else {
            resolve(false)
          }
        })
    })
  }
}

function answerToOptions (answer) {
  // names of all the simple options that will remain unchanged
  const validOptions = new Set([
    'badge',
    'body',
    'dir',
    'icon',
    'image',
    'lang',
    'renotify',
    'silent',
    'tag',
    'timestamp',
    'title',
    'vibrate'
  ])
  const answerTypes = Object.keys(answer)
  var options = { data: {} }

  answerTypes.forEach(type => {
    if (validOptions.has(type)) {
      console.log(type)
      options[type] = answer[type]
    } else if (!type.match(/^action/)) {
      options.data[type] = answer[type]
    }
  })

  if ('action' in answerTypes) {
    options.actions = answerTypes.filter(type => {
      return type.match(/^action-/)
    }).map(action => answer[action])
  }

  return options
}

function Custom () {
  return new Promise((resolve, reject) => {
    var typeNames = Object.keys(schemes).concat([
      new inquirer.Separator(),
      'test',
      'cancel'
    ])
    inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What type of notification will you send?',
        choices: typeNames,
        default: typeNames[0]
      }
    ])
      .then(answer => {
        if (answer.type === 'cancel') return
        if (answer.type === 'test') resolve(new Notification())
        else {
          inquirer.prompt(schemes[answer.type])
            .then(answers => {
              resolve(new Notification(answerToOptions(answers)))
            })
        }
      })
  })
}

module.exports = Notification
module.exports = {
  Custom
}
