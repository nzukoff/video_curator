import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveAddedVideo, getVideoList } from '../../actions/index'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

export class AddVideo extends Component {
  constructor(props) {
    super(props)

    this.state = { updatedTitle: '', link: '' }
  }

  editTitle = (event) => {
    const target = event.target
    const value = target.value
  
    this.setState({ updatedTitle: value })
  }  

  editLink = (event) => {
    const target = event.target
    const value = target.value
  
    this.setState({ link: value })
  }

  render() {
    return (
      <div className="AddVideo">
        <Dialog
          open={true}
          onClose={() => this.props.getVideoList()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Video Title"
              type="text"
              onChange={(e) => this.editTitle(e)}
              value={this.state.updatedTitle}
              fullWidth
            />
            <TextField
              margin="dense"
              id="link"
              label="Video Link"
              type="text"
              onChange={(e) => this.editLink(e)}
              value={this.state.link}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.getVideoList()} color="primary" id="CancelAddVideoButton">
              Cancel
            </Button>
            <Button onClick={() => this.props.saveAddedVideo(this.state.updatedTitle, this.state.link)} color="primary" id="AddVideoButton">
              Add Video
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  saveAddedVideo: (title, link) => dispatch(saveAddedVideo(title, link)),
  getVideoList: () => dispatch(getVideoList())
})

export default connect(
  null,
  mapDispatchToProps
)(AddVideo)
