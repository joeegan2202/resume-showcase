import React from 'react';
import './App.css';
import './icon.png'
import { Button, TextField } from '@material-ui/core';
import crypto from 'crypto' // Import for hashing

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      session: this.jsonCookie().session,
      scrollPosition: 0,
      uname: '', // State for the values of the input fields
      pword: ''
    }
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
    this.setState({
      scrollPosition: scrollPosition
    })
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
    fetch(`http://localhost:3500/auth?uname=${this.state.uname}&pword=${crypto.createHash('md5').update(this.state.pword).digest('hex')}`)
      .then(response => response.json())
      .then(data => {
        if(data) {
          console.log(data.session)
          document.cookie = `session=${data.session}`
          this.setState({session: data.session})
        } else {
          console.log('None')
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style={{ // Responsive script to resize header
          height: ((this.state.scrollPosition < 220) ? 20 : 10) + 'vh'}}>
          <p>
            Edit <b>src/App.js</b> and save to reload.
          </p>
          {(!this.state.session) ? // If we aren't authenticated, render login
          <form onSubmit={e => {e.preventDefault(); this.authenticate()}}>
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
          </form> : // If we are, render icon etc.
          <div id="icon"><img alt="" src="icon.png"></img></div>}
        </header>
        <Scroller request={this.request.bind(this)}
          scrollCallback={this.scrollCallback.bind(this)}></Scroller>
      </div>
    )
  }
}

class Scroller extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      requestData: ''
    }
  }
  scrollListener = () => { // Listen to scroll position and callback to App
    const scroll = document.body.scrollTop || document.documentElement.scrollTop // Stolen from StackOverflow

    this.props.scrollCallback(scroll)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
  }

  render() {
    return (
      <div className="scroll">
        <Button color="primary" variant="contained" onClick={() => {
          this.props.request({test:'stuff'})
            .then(data => this.setState({requestData: data.requestedData}))}
            }>Get Request</Button>
        <h1>{this.state.requestData}</h1>
        <p>
          A good deal of text is to be put into this paragraph tag.<br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia vestibulum porttitor. Nulla ultrices fermentum arcu, a pretium arcu malesuada nec. Vivamus imperdiet volutpat ligula vel finibus. Curabitur lorem mi, ultricies pretium lacinia finibus, tincidunt a turpis. Duis interdum lorem nec ex malesuada, ut finibus ex venenatis. Maecenas ac mi diam. Vivamus ullamcorper luctus massa vel viverra. Suspendisse sit amet cursus nisi, vel hendrerit nisi. Nulla facilisi. Quisque libero justo, tincidunt quis purus vitae, laoreet tempor odio. Suspendisse semper sapien in libero scelerisque gravida. Mauris molestie sapien eu sapien rhoncus pulvinar. Praesent vitae mollis felis, a laoreet augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse et mauris ut tellus placerat ullamcorper.<br/>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam viverra felis et mattis condimentum. Pellentesque porta sem et mauris mollis, vel bibendum metus ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam condimentum dolor in arcu maximus porta vel et quam. Fusce convallis euismod sapien, eu sodales nulla condimentum in. Nam iaculis condimentum erat sit amet mattis. Donec ac nisl vitae risus eleifend hendrerit at sed ex. Phasellus diam ligula, porttitor sit amet diam sed, facilisis molestie augue. In ut ante sed metus ultricies lacinia cursus et justo. Maecenas gravida mauris eget justo faucibus, in tristique lectus consectetur.<br/>
          Phasellus viverra a velit ac laoreet. Duis felis lectus, maximus in placerat non, pharetra quis massa. Nullam pulvinar, augue eget interdum cursus, dui neque suscipit lectus, a varius nisi ligula id nulla. Ut consectetur enim mi, vel posuere metus malesuada nec. Integer ultricies a eros in molestie. Morbi tincidunt nec turpis eu auctor. Proin id orci suscipit sapien placerat porttitor in eget lectus. Morbi placerat nunc sed diam convallis, ac placerat libero interdum. Integer massa leo, ullamcorper at elit faucibus, condimentum vulputate augue. Nam elit nisi, hendrerit vitae tortor ac, rhoncus gravida libero. Integer ultricies, risus a laoreet euismod, dolor dui consectetur augue, et dapibus lectus nisi eu ante. Fusce eu molestie nulla. Vestibulum at lorem sed libero pulvinar sollicitudin.<br/>
          Mauris at lectus in nulla fringilla consequat sed sollicitudin ipsum. Nam ornare, est in posuere sodales, felis eros pulvinar enim, quis placerat odio purus at arcu. Duis porta dapibus quam, sed consequat elit. Nullam accumsan risus in lectus vestibulum, vel molestie felis vulputate. Donec pretium hendrerit erat, id ultricies augue finibus ut. Nunc non felis vitae enim fringilla semper. Aliquam tellus nulla, porttitor id tempus et, tristique ut massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent gravida nisl et mi ultrices, nec dictum tortor malesuada. Cras ullamcorper auctor risus eu porta. Etiam porta a leo finibus fermentum. Praesent dignissim enim at faucibus suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;<br/>
          Vivamus quis dolor venenatis, consectetur ante vel, sagittis ligula. Suspendisse luctus, urna vel aliquet venenatis, ligula risus tristique magna, at ultrices ligula enim at dolor. Etiam quis urna rhoncus, tincidunt massa ut, sagittis quam. Donec id est nec eros laoreet rhoncus. Quisque vel nulla augue. Ut laoreet dolor ut magna condimentum venenatis. Sed convallis faucibus nisl, vel tempor nulla aliquam sed. Phasellus sit amet scelerisque orci, nec molestie mauris. Cras augue risus, egestas at dui in, interdum ornare ex. Curabitur vitae arcu eget libero vestibulum sagittis. Suspendisse imperdiet, tellus ac feugiat malesuada, erat ante ultricies arcu, nec ornare sem mi sit amet nunc. Morbi pulvinar volutpat ex, vel aliquet lacus dignissim ac. Curabitur a orci cursus nunc ullamcorper faucibus. Aenean suscipit turpis vel magna pharetra viverra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.<br/>
          Fusce blandit scelerisque magna, ac viverra dolor aliquam in. Curabitur at sapien nec enim malesuada consectetur in porttitor urna. Integer varius gravida rhoncus. Morbi dui ligula, feugiat vitae tincidunt eget, lacinia vitae nunc. Nunc eu magna tempor, tincidunt ligula blandit, aliquam risus. Suspendisse eu tortor ac est vestibulum placerat aliquam nec dui. Suspendisse eleifend varius libero eget lobortis. Nulla id blandit turpis. Maecenas in odio consequat, aliquet odio et, lobortis neque. Integer a ligula ac turpis sollicitudin pulvinar non in dolor.<br/>
          Quisque fermentum eros erat, id malesuada leo euismod nec. Fusce feugiat sodales commodo. Proin vel neque sagittis, hendrerit dui semper, lobortis ex. Sed maximus odio vitae massa lacinia maximus. Donec varius mattis ligula non bibendum. Nam tincidunt, sem non tempus iaculis, mi nibh molestie est, et pharetra lacus eros non dolor. Donec erat ex, blandit ut semper vitae, euismod ut sapien. Nulla pharetra magna at urna semper condimentum. Praesent volutpat dapibus magna, at vulputate mi feugiat sit amet. Aliquam congue eleifend mauris vel placerat. Vivamus a aliquet ligula, a hendrerit felis. Fusce eget turpis id orci condimentum molestie.<br/>
          Integer sodales pretium nulla, vel tempus arcu tristique aliquet. Mauris elementum quam a imperdiet interdum. Nulla cursus mi sed leo commodo, in facilisis purus commodo. In nulla ex, euismod in feugiat a, ultricies et odio. Donec lobortis semper nisl, a mattis ligula hendrerit sit amet. Phasellus placerat congue velit, nec sodales sem porta nec. Maecenas non sem et sapien lobortis consectetur vel faucibus dui. Nam quis ligula massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc luctus feugiat tortor, vitae aliquam arcu pellentesque id. Donec congue magna id erat faucibus, vel dapibus eros pretium. Nam nec mi ullamcorper, tincidunt diam quis, ullamcorper felis. Nullam eleifend, dui ut tempus aliquet, nibh tortor porta est, quis pellentesque neque dui eget diam. Sed suscipit viverra magna in convallis.<br/>
          In vulputate neque ultrices iaculis interdum. Integer bibendum metus ultrices mauris dictum sollicitudin. Integer turpis mauris, viverra tempus eleifend quis, ullamcorper eget urna. Nam eleifend nisi sit amet varius lobortis. Phasellus blandit ex vitae mi cursus rhoncus. Mauris nec feugiat felis, ac vehicula sapien. Vestibulum tincidunt, lorem ac gravida vestibulum, lectus justo rutrum purus, quis luctus libero diam at ligula. Aliquam dapibus aliquam eros, eu sodales risus vestibulum quis. Morbi eleifend sed diam sit amet dictum. Ut tristique dolor nec erat vestibulum imperdiet. Aliquam id tellus a purus commodo malesuada.<br/>
          Nam ultricies tristique arcu. Nunc iaculis, enim at lobortis viverra, erat erat facilisis justo, eget dictum dui ante ut lacus. Pellentesque sed rhoncus magna. Ut sed lacus vitae ex venenatis ultricies. Maecenas in ultrices massa. Ut eu sagittis velit. Proin sed tempor lectus, a feugiat nulla. Sed rutrum massa tempor rutrum placerat. Proin sit amet volutpat lorem, eu malesuada velit. Donec non lobortis ipsum. Cras at mauris eget urna laoreet ultricies. Duis rutrum sit amet lectus sit amet lobortis. Phasellus sed vestibulum dolor. Ut faucibus sollicitudin scelerisque. Donec venenatis vehicula massa eget luctus. <br/>
        </p>
      </div>
    )
  }
}

export default App;
