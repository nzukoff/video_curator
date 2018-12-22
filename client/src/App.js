import React from 'react';
import { connect } from 'react-redux'

import logo from './logo.jpg';
import './App.css';
import VideoList from './components/VideoList/VideoList'
import AddVideo from './components/AddVideo/AddVideo'
import EditVideo from './components/EditVideo/EditVideo'
import { addVideo } from './actions/index'

export const App = (props) => {
  let visible_content

  if (props.view ==='add_video') {
    visible_content =
      <div className="row">
        <div className="col">
          <AddVideo />
        </div>
      </div>
  } else if (props.view ==='edit_video') {
    visible_content =
      <div className="row">
        <div className="col">
          <EditVideo  />
        </div>
      </div>
  } else if (props.view ==='video_list') {
    visible_content =
      <div className="row">
        <div className="col">
          <VideoList />
        </div>
        <div className="col">
          <button type='button' className="btn btn-secondary" onClick={() => props.addVideo()}>Add Video</button>
        </div>
      </div>
  }

  return(
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>World's Best Videos</h1>
            <img src={logo} className="logo" alt="logo" />
          </div>
        </div>
      </div>
      <div className="container">
        {visible_content}
      </div>
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
