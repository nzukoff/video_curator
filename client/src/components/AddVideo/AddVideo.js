import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveAddedVideo, getVideoList } from '../../actions/index'

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0D0E0E' },
  },
  typography: { useNextVariants: true },
});

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
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={true}
            onClose={() => this.props.getVideoList(this.props.sortBy)}        >
            <DialogTitle>Add Video</DialogTitle>
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
              <Button onClick={() => this.props.getVideoList(this.props.sortBy)} id="CancelAddVideoButton">
                Cancel
              </Button>
              <Button onClick={() => this.props.saveAddedVideo(this.state.updatedTitle, this.state.link, this.props.sortBy)} id="AddVideoButton">
                Add Video
              </Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
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
)(AddVideo)
