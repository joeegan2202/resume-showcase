import React from 'react'
import View from './View.js'
import Sidebar from './Sidebar.js'
import { Card } from '@material-ui/core'

class AuthView extends View {
  constructor(props) {
    super(props)
    
    this.state = {
      subview: 0
    }
  }

  contentCallback(content) {
    this.setState({subview: content})
  }

  render() {
    let content
    switch(this.state.subview) {
      case 0: content = <div id="content">
          <h1>About this website:</h1>
          <p>I built this website as a partial demonstration of my skills in web development.
            It is hosted with Git on my personal server, but I've put a mirror on my Github:
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/resume-showcase">
            <img alt="github link" src="github.png"></img>
            </a></Card>
          <p>
            This website was built on the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS),
            utilizing MaterialUI from Google's Material Design.
            The web server and back-end API server are both currently hosted on my own server.
          </p>
        </div>
        break
      case 1: content = <div id="content">
        <p>Repos here!!!</p>
      </div>
        break
      case 2: content = <div id="content">
        <p>Resume here!!!</p>
      </div>
        break
      default: content = <div id="content">
        <h1>Error? Unexpected case in subview?</h1>
      </div>
    }
    return (
      <div className="authview">
        <Sidebar callback={this.contentCallback.bind(this)}></Sidebar>
        {content}
      </div>
    )
  }
}

export default AuthView