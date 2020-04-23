import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollPosition: 0,
    }
  }

  scrollCallback = (scrollPosition) => {
    this.setState({
      scrollPosition: scrollPosition
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style={{height: ((this.state.scrollPosition < .25) ? 30 : 15) + 'vh'}}>
          <p>
            Edit <b>src/App.js</b> and save to reload.
          </p>
          <Button color="primary">Test Button</Button>
        </header>
        <Scroller callback={this.scrollCallback.bind(this)}></Scroller>
      </div>
    )
  }
}

class Scroller extends React.Component {
  constructor(props) {
    super(props)
  }

  scrollListener = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const scrolled = scroll/height

    this.props.callback(scrolled)
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
