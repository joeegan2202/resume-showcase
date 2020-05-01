import React from 'react'
import View from './View.js'

class UnauthView extends View {
  render() {
    return (
      <div className="unauthview">
        <h1>Please login to access my website <div id="blinking">____</div></h1>
      </div>
    )
  }
}

export default UnauthView