import React from 'react';
import { connect } from 'react-redux'

import logo from './logo.jpg'
import './App.css';
import VideoList from './components/VideoList/VideoList'
import AddVideo from './components/AddVideo/AddVideo'
import EditVideo from './components/EditVideo/EditVideo'
import Header from './components/Header/Header'
import { addVideo } from './actions/index'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export const App = (props) => {
  let visible_content

  if (props.view ==='add_video') {
    visible_content =
          <AddVideo />        
  } else if (props.view ==='edit_video') {
    visible_content =
          <EditVideo  />
  } else if (props.view ==='video_list') {
    visible_content =
      <div>
        <VideoList />
      </div>
          
  }

  return(
    <div className="App">
      <Header />
      {visible_content}
    </div>
  )
}

const mapStateToProps = state => ({view: state.view})

const mapDispatchToProps = dispatch => ({
  addVideo: () => dispatch(addVideo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
