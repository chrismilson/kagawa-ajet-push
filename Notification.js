class Notification {
  constructor (title, options) {
    this._title = title || 'Test'
    this._options = options || {
      body: 'This is a test. Click me!',
      actions: [
        {
          action: 'events',
          title: 'Events'
        }
      ],
      tag: 'test',
      renotify: true
    }
  }

  get json () {
    return {
      title: this._title,
      options: this._options
    }
  }
}

module.exports = Notification
