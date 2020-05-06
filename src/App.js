import React from 'react';
import './App.css';
import './icon.png'
import './hamburger.png'
import { Button, TextField } from '@material-ui/core';
import crypto from 'crypto' // Import for hashing
import UnauthView from './UnauthView.js'
import AuthView from './AuthView.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      session: this.jsonCookie().session,
      uname: '', // State for the values of the input fields
      pword: '',
      largeSize: true,
      onlyAuth: false,
      scrollPosition: 0
    }
  }

  resize() {
    let state = {}
    if(window.innerWidth > 600) {
      state.onlyAuth = false
      state.largeSize = true
    } else {
      state.largeSize = false
    }
    if(this.state.scrollPosition < 220) {
      document.documentElement.style.setProperty('--header-height', `${Math.max(.25 * window.innerHeight, 100)}px`)
      if(this.state.session) {
        document.documentElement.style.setProperty('--header-height', `${Math.max(.15 * window.innerHeight, 100)}px`)
      }
    } else {
      document.documentElement.style.setProperty('--header-height', `${Math.max(.1 * window.innerHeight, 100)}px`)
    }
    this.setState(state)
  }

  componentDidMount() {
    if(this.state.session) {
      this.request({}).then(data => {
        if(data.session) {
          this.setState({session: data.session})
        } else {
          this.setState({session: false})
          document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
        }
      })
    }
    
    this.resize()

    window.addEventListener('resize', this.resize.bind(this))
  }

  jsonCookie = () => { // Method to convert cookie data to parsed json automatically
    let cookie = '{"' + document.cookie + '"}'

    cookie = cookie.replace(/; /g, '", "')
    cookie = cookie.replace(/=/g, '":"')

    console.log(cookie)

    try {
      return JSON.parse(cookie)
    } catch (error) {
      return false
    }
  }

  scrollCallback = (scrollPosition) => { // Callback to resize header on scroll
    console.log(scrollPosition)
    this.setState({scrollPosition})
    this.resize()
  }

  request(requests) {
        console.log(`http://localhost:3500/?session=${this.state.session}&${(() => {
        let total = ''
        for(const prop in requests) {
          total += `${prop}=${requests[prop]}&`
        }
        return total
      })()}`)
    return (fetch(`http://localhost:3500/?session=${this.state.session}&${(() => {
        let total = ''
        for(const prop in requests) {
          total += `${prop}=${requests[prop]}&`
        }
        return total
      })()}`).then(response => response.json()))
  }

  authenticate() { // Method to get session id from server with username and password and store with cookie
    try {
    fetch(`http://localhost:3500/auth?uname=${this.state.uname}&pword=${crypto.createHash('sha256').update(this.state.pword).digest('hex')}`)
      .then(response => response.json())
      .then(data => {
        if(data) {
          console.log(data.session)
          document.cookie = `session=${data.session}`
          this.setState({session: data.session})
          this.resize()
        } else {
          console.log('None')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    let login
    if(this.state.session) {
      login = (<div id="icon"><img alt="" src="icon.png"></img></div>)
    } else if(this.state.largeSize) {
      login = (<form onSubmit={e => {e.preventDefault(); this.authenticate()}}>
        <div id="input">
         <TextField id="uname" label="Username"
          autoComplete="current-username" variant="outlined"
          onChange={(event) => this.setState({uname: event.target.value})}/>
         <TextField id="pword" label="Password"
          type="password" autoComplete="current-password" variant="outlined"
          onChange={(event) => this.setState({pword: event.target.value})}/>
        </div>
        <div id="button">
          <Button type="submit" color="primary" variant="contained" fullWidth>Login</Button>
        </div>
      </form>)  // If we are, render icon etc.
    } else {
      if(this.state.onlyAuth) {
        login = (<form onSubmit={e => {e.preventDefault(); this.authenticate()}}>
        <div id="input">
         <TextField id="uname" label="Username"
          autoComplete="current-username" variant="outlined"
          onChange={(event) => this.setState({uname: event.target.value})}/>
         <TextField id="pword" label="Password"
          type="password" autoComplete="current-password" variant="outlined"
          onChange={(event) => this.setState({pword: event.target.value})}/>
        </div>
        <div id="button">
          <Button type="submit" color="primary" variant="contained" fullWidth>Login</Button>
        </div>
      </form>)
      } else {
        login = (<div id="hamburger"><img onClick={() => this.setState({onlyAuth: true})} alt="" src="hamburger.png"></img></div>)
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          {(!this.state.onlyAuth || this.state.largeSize) ? <p>
            <b>Welcome to Joe's Demonstration Website/Resumé!</b>
          </p> : null}
          {login}
        </header>
        {(this.state.session) ? <AuthView request={this.request.bind(this)}
          scrollCallback={this.scrollCallback.bind(this)}></AuthView>
        : <UnauthView request={this.request.bind(this)}
          scrollCallback={this.scrollCallback.bind(this)}></UnauthView>}
      </div>
    )
  }
}

export default App;
