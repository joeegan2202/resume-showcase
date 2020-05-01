import React from 'react';
import './View.css';

class View extends React.Component {
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
    // 
    //    <Button color="primary" variant="contained" onClick={() => {
    //      this.props.request({test:'stuff'})
    //        .then(data => this.setState({requestData: data.requestedData}))}
    //        }>Get Request</Button>
    return (
      <div className="view">
      </div>
    )
  }
}

export default View;