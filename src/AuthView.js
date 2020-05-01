import React from 'react'
import View from './View.js'
import Sidebar from './Sidebar.js'

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
          <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra felis quis nisl vehicula interdum. Aenean nec porttitor neque. Morbi auctor feugiat purus vel vehicula. Nam ac imperdiet odio. Proin ut placerat tellus. Suspendisse eget nulla leo. Curabitur rhoncus non est quis condimentum. Nunc bibendum semper libero. Proin in lobortis nibh. Donec ullamcorper odio neque, a sollicitudin turpis viverra at. Nullam id leo ac erat iaculis ornare ac sed lacus. Pellentesque vitae diam vel turpis volutpat vulputate quis quis ligula. Praesent convallis massa enim, eget pharetra lectus luctus quis. Donec at urna eros. Duis turpis orci, pharetra vitae orci ut, tincidunt aliquet est.<br/><br/><br/><br/><br/>
In hac habitasse platea dictumst. Ut vestibulum dolor et enim ornare, sit amet mattis metus sollicitudin. Nam eget lectus dapibus, facilisis turpis in, pharetra quam. Aenean faucibus maximus leo, maximus sodales nisl cursus at. Pellentesque viverra non erat ut hendrerit. Praesent malesuada, diam sit amet tincidunt dapibus, nisi augue hendrerit quam, vel pellentesque augue justo tincidunt tortor. Nulla ac posuere lacus. Donec non urna nec enim sagittis blandit vel id libero. Duis semper dolor in nunc ultricies, at molestie eros suscipit. Vestibulum sodales non ante id congue.<br/><br/><br/><br/><br/>
Aenean quis quam bibendum, dapibus lorem eget, ultrices massa. Sed ultrices venenatis dolor, nec feugiat enim suscipit vel. Pellentesque id lacus nibh. Integer quis maximus turpis. Suspendisse commodo luctus massa non bibendum. In elementum sit amet justo quis interdum. Mauris suscipit dictum finibus.<br/><br/><br/><br/><br/>
In non rutrum sapien. Pellentesque tempor aliquam mauris, ullamcorper placerat eros maximus at. Donec a ligula id leo aliquam mattis at quis nibh. Nulla venenatis posuere tortor in tincidunt. Integer sollicitudin metus in porta fermentum. Aenean ante mi, dictum pellentesque magna ac, pretium dignissim magna. Quisque euismod ligula eget ornare finibus. Nam id sapien eget urna aliquam luctus id id lorem.<br/><br/><br/><br/><br/>
Aliquam erat volutpat. Duis vel tempor odio, et vulputate enim. Integer vel nibh ac enim posuere facilisis. Integer lectus leo, aliquet et ultrices vitae, feugiat a erat. Sed porta mi sed rutrum vestibulum. Cras sagittis turpis libero, a laoreet ligula tincidunt vel. Nulla arcu lectus, molestie ut ligula a, semper facilisis augue. Proin molestie condimentum ipsum a aliquam. Phasellus eu est in quam tempus porttitor in vel libero. Mauris at libero at quam pellentesque vehicula eleifend id sapien. In molestie elit ac rhoncus pulvinar. Praesent vitae libero lacus. Fusce sit amet diam eget mi elementum consectetur id in ligula. Nullam gravida nibh porta, lobortis massa at, ornare ipsum. Vivamus pharetra consequat tempor.<br/><br/><br/><br/><br/>
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