import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveAddedVideo, getVideoList } from '../../actions/index'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Snackbar, SnackbarContent } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
})

export class AddVideo extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      updatedTitle: '', 
      link: '', 
      titleErrorText: '', 
      linkErrorText: ''
    }
  }

  editTitle = async (event) => {
    const target = event.target
    const value = target.value
    await this.setState({ updatedTitle: value })
    if (this.state.updatedTitle.length >= 5) {
      this.setState({ titleErrorText: '' })
    } 
  }  

  editLink = async (event) => {
    const target = event.target
    const value = target.value
    await this.setState({ link: value })
    if (this.state.link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)) {
      this.setState({ linkErrorText: '' })
    } 
  }

  checkInputs = async () => {
    if (!this.state.updatedTitle) {
      await this.setState({ titleErrorText: 'Title is required' })
    } else if (this.state.updatedTitle.length < 5) {
      await this.setState({ titleErrorText: 'Title must be more than 5 letters' })
    } 

    if (!this.state.link) {
      await this.setState({ linkErrorText: 'Link is required' })
    } else if (!this.state.link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)) {
      await this.setState({ linkErrorText: 'Link must be a YouTube link' })
    }

    if (!this.state.titleErrorText && !this.state.linkErrorText) {
      this.props.saveAddedVideo(this.state.updatedTitle, this.state.link, this.props.sortBy)
    } 
  }

  render() {
    return (
      <div className="AddVideo">
        <Dialog
          open={true}
          onClose={() => this.props.getVideoList(this.props.sortBy)}>
          <DialogTitle>Add Video</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="title"
              label="Video Title"
              onChange={(e) => this.editTitle(e)}
              value={this.state.updatedTitle}
              fullWidth
              error={!!this.state.titleErrorText}
              helperText={this.state.titleErrorText}
              margin="normal"
              required={true}
            />
            <TextField
              id="link"
              label="Video Link"
              margin="normal"
              onChange={(e) => this.editLink(e)}
              value={this.state.link}
              fullWidth
              error={!!this.state.linkErrorText}
              helperText={this.state.linkErrorText}
              required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.getVideoList(this.props.sortBy)} id="CancelAddVideoButton">
              Cancel
            </Button>
            <Button onClick={() => this.checkInputs()} id="AddVideoButton">
              Add Video
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sortBy: state.sortBy
})

const mapDispatchToProps = dispatch => ({
  saveAddedVideo: (title, link, sortBy) => dispatch(saveAddedVideo(title, link, sortBy)),
  getVideoList: (sortBy) => dispatch(getVideoList(sortBy))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddVideo))
