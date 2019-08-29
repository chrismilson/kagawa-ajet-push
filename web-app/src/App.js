import React from 'react'
import './App.scss'

class App extends React.Component {
  constructor (props) {
    super(props)

    const statuses = {}

    ;[
      {
        name: 'ready',
        message: 'Ready...'
      },
      {
        name: 'sending',
        message: 'Pushing to Server...'
      }
    ].forEach(status => (statuses[status.name] = status))

    this.state = {
      statuses,
      values: {
        title: {
          type: 'text',
          value: 'Test'
        },
        body: {
          type: 'text',
          value: 'this is a test'
        },
        url: {
          obj: 'select',
          type: 'text',
          value: '/calendar',
          options: [
            '/calendar',
            '/'
          ]
        }
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.clear = this.clear.bind(this)
  }

  handleChange (event) {
    const value = event.target.value
    const name = event.target.name

    console.log(event.target.value)

    this.setState(old => {
      const state = old
      state.values[name].value = value
      return state
    })
  }

  submitForm (event) {
    const title = this.state.values.title.value
    var options = {}

    Object.keys(this.state.values).forEach(name => {
      if ([
        'title',
        'type'
      ].includes(name)) return
      options[name] = this.state.values[name].value
    })

    console.log('Title:', title)
    console.log('Options:')
    console.log(options)

    event.preventDefault()
  }

  clear () {
    this.setState(old => {
      const state = old
      Object.keys(old.values).forEach(name => {
        let clear
        switch (old.values[name].type) {
          case 'text': clear = ''
            break
          default:
            throw new Error('Whut?')
        }
        state.values[name].value = clear
      })
      return state
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='content'>
          <h1>Notification Pusher</h1>
          <form
            className='notifyForm'
            onSubmit={this.submitForm}
            autoComplete='off'
          >
            {
              Object.keys(this.state.values).map((name, idx) => {
                let input
                switch (this.state.values[name].obj) {
                  case 'select':
                    input = (
                      <select
                        name={name}
                        value={this.state.values[name].value}
                        onChange={this.handleChange}
                      >
                        {
                          this.state.values[name].options.map(option => (
                            <option value={option}>
                              {option}
                            </option>
                          ))
                        }
                      </select>
                    )
                    break
                  case 'text':
                  default:
                    input = (
                      <input
                        name={name}
                        {...this.state.values[name]}
                        onChange={this.handleChange}
                      />
                    )
                }
                return (
                  <div key={idx} className='input'>
                    <strong className='label'>
                      {
                        name[0].toUpperCase() + name.substr(1)
                      }
                    </strong>
                    {
                      input
                    }
                  </div>
                )
              })
            }
            <input type='button' value='Clear' onClick={this.clear} />
            <input type='submit' value='Send!' />
          </form>
        </div>
      </div>
    )
  }
}

export default App
