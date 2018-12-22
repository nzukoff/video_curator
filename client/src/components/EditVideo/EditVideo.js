import React, { Component } from 'react';
import { connect } from 'react-redux'

import { saveEditedVideo, deleteVideo } from '../../actions/index'

export class EditVideo extends Component {
  constructor(props) {
    super(props)

    this.state = { updatedTitle: this.props.videos.find((video) => (video.id === this.props.editingIndex)).title }
  }

  editTitle = (event) => {
    const target = event.target
    const value = target.value
  
    this.setState({ updatedTitle: value })
  }

  render() {
    return (
      <div className="EditVideo">
        <form onSubmit={(e) => {e.preventDefault(); this.props.saveEditedVideo(this.props.editingIndex, this.state.updatedTitle)}}>
          <div className="container">
            <div className="row">
              <div className="col">
                <input name='title' value={this.state.updatedTitle} onChange={(e) => this.editTitle(e)} autoFocus />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <button name='delete' type='button' id='delete-button' className="btn btn-danger" onClick={() => this.props.deleteVideo(this.props.editingIndex)}>Delete</button>
              </div>
              <div className="col-2">
                <button name='enter' type='button' className="btn btn-secondary" onClick={() => this.props.saveEditedVideo(this.props.editingIndex, this.state.updatedTitle)}>Save</button>
              </div>
              <div className="col">
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  videos: state.videos,
  editingIndex: state.editingIndex
})

const mapDispatchToProps = dispatch => ({
  saveEditedVideo: (index, title) => dispatch(saveEditedVideo(index, title)),
  deleteVideo: (index) => dispatch(deleteVideo(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditVideo)
