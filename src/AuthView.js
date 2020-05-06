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
            utilizing MaterialUI from Google's Material Design, and was written almost entirely in JavaScript.
            The web server and back-end API server are both currently hosted on my own server.
            This website functions with browser cookies to store sessions, cryptography on client and server
            to hash passwords and keep the authentication at least somewhat safe. I originally only wanted to test
            some authentication developing before I decided to refocus on making a resumé/demonstration application.
          </p>
          <p>
             I am not a web designer, so I know that the general formatting is substandard, and CSS is an enormous pain.
             However, this is the most complete and largest project I have ever written.
          </p>
        </div>
        break
      case 1: content = <div id="content">
        <p>
          <h1>My Various Coding Projects</h1>
          <h2>Modern Projects</h2>
          <p>
            <b>C++</b><br/>
            This is my testing of the SDL library. A lot was built off of an online tutorial,
            but I wanted to play around with C++ basics on my own. I'm much more comfortable with pointers,
            C++ classes, and C++ strangeness.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/sdltest">
            <img alt="github link" src="sdltest.png"></img>
          </a></Card>
          <p>
            <b>JavaScript</b><br/>
            This was an earlier test of putting a game online, like so many of the .io games and whatnot.
            It was supposed to be a card game, but I got bored with it, and I did not start the project
            on the right foot. I should have built the game engine, and then built the networking on top.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/PresidentGame">
            <img alt="github link" src="PresidentGame.png"></img>
          </a></Card>
          <p>
            <b>Rust</b><br/>
            This was just a simple test of the Rust language. I like the idea of it, but I also don't program
            that much stuff that needs low-level memory management. C++ is more versatile and much more established,
            but I like the idea of Rust, and the syntax is much more modern.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/TestRust">
            <img alt="github link" src="TestRust.png"></img>
          </a></Card>
          <p>
            <b>Java/Kotlin</b><br/>
              I haven't been programming in Java much recently, but it is such a versatile language that
              I try to keep up on my knowledge. I've also tried out Kotlin, which I would definitely prefer
              when I need to build a Android app.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/ImageRecognition">
            <img alt="github link" src="ImageRecognition.png"></img>
          </a></Card>
          <p>
            Both of these projects were tests of neural networks. They are not very good, but the basics
            of neurons and a simple activation function are there. I don't know much about
            all the math and computer science that goes into the backpropagation and everything.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/TestNeuralNetwork">
            <img alt="github link" src="TestNeuralNetwork.png"></img>
          </a></Card>
          <h2>Ancient Projects</h2>
          <p>
            <b>Java</b><br/>
            Java was really the first language I ever learned to a working degree. These projects are
            centered around what a 13 year old would make, i.e. bad video game attempts. The one project
            that I got furthest with was my game engine idea, which I never used in any real games.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/LWJGE">
            <img alt="github link" src="LWJGE.png"></img>
          </a></Card>
          <p>
            I also have a lot of other random tests of LWJGL, the LightWeight Java Game Library, which are
            very messy and I practically rewrote into my LWJGE, LightWeight Java Game Engine.
          </p>
          <Card className="githubcard"><a href="https://github.com/joeegan2202/JavaProjects">
            <img alt="github link" src="JavaProjects.png"></img>
          </a></Card>
        </p>
      </div>
        break
      case 2: content = <div id="content">
        <h2>The resumé that I wrote for composition class:</h2>
        <embed src="TestResume.pdf#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="600px" />
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