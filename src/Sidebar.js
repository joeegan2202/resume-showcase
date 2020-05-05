import React from 'react'
import './Sidebar.css'
import { List, ListItem, ListItemText } from '@material-ui/core'

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <List>
          {['About', 'Projects', 'Resume'].map((text, index) => (
            <ListItem button key={text} onClick={() => this.props.callback(index)}>
              <ListItemText primary={text}></ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default Sidebar