import React, { Component } from 'react'
import { connect } from 'react-redux'

import { copyToClipboard, getVideoList } from '../../actions/index'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {  Dialog, 
          DialogContent, 
          Button, 
          TextField, 
          Checkbox, 
          Snackbar,
          FormControlLabel
         } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  link: {
    border: 'solid',
    paddingLeft: '1rem',
    borderWidth: 'thin',
    borderColor: '#aaadad',
    backgroundColor: '#f2f3f3',
    borderRadius: '3px',
  },
  text: {
    fontSize: '.9rem',
    verticalAlign: 'middle',
    paddingRight: '1rem',
  }, 
  buttonText: {
    color: '#22a0ff',
  }, 
  textField: {
    paddingBottom: '0px',
    marginTop: '3px',
  }
})

export class Share extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      link: props.video.link, 
      disabled: true, 
      snackbar: false
    }
  }

  editLink = async (event) => {
    const target = event.target
    const value = target.value
    let seconds
    if (value.match(/^[\d]+:[\d]+:[\d]+$/)) {
      const hours = value.split(':')
      seconds = parseInt(hours[0])*3600 + parseInt(hours[1])*60 + parseInt(hours[2])
    } else if (value.match(/^[\d]+:[\d]+$/)) {
      const minutes = value.split(':')
      seconds = parseInt(minutes[0])*60 + parseInt(minutes[1])
    } else if (value.match(/[\d]+$/)) {
      seconds = value
    }
    if (seconds) {
      this.setState({ link: `${this.props.video.link}#t=${seconds}s`, seconds })
    } else if (!seconds) {
      this.setState({ link: this.props.video.link, seconds:'' })
    }
  }  

  handleClick = () => {
    if (this.state.disabled) {
      this.state.seconds ? this.setState({disabled: false, link:`${this.props.video.link}#t=${this.state.seconds}s`}) : this.setState({ disabled: false })
    } else {
      this.setState({disabled: true, link: this.props.video.link})
    }
  }

  closeSnackbar = () => {
    this.setState({snackbar: false})
  }

  closeDialog = () => {
    this.setState({disabled: true, snackbar: false, link: this.props.video.link, seconds: ''})
    this.props.getVideoList(this.props.sortBy)
  }

  copyToClipboard = () => {
    this.setState({ snackbar: true })
    setTimeout(this.closeDialog, 1700) 
  }

  render() {
    const { classes } = this.props
    return (
      <div className="Share">
        <Dialog
          open={this.props.open}
          onClose={() => this.closeDialog()}
          >
          <DialogContent>
            <div className={classes.link}>
              <span className={classes.text}>{this.state.link}</span>
              <CopyToClipboard text={this.state.link} onCopy={() => this.copyToClipboard()}>
                <Button className={classes.buttonText} id="CopyLink">
                  Copy
                </Button>
              </CopyToClipboard>
            </div>         
            <br />        
            <FormControlLabel
              control={
                <Checkbox 
                  color="default"
                  onChange={() => this.handleClick()}
                  >    
                </Checkbox>
              }
              label="Start time:"
            />
            <TextField
              onChange={(e) => this.editLink(e)}
              margin="dense"
              disabled={this.state.disabled}
              placeholder="00:00"
              InputProps={{ classes: {input: classes.textField }}}
              />
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical:'top', horizontal: 'right' }}
          open={this.state.snackbar}
          autoHideDuration={1700}
          onClose={() => this.closeSnackbar()}
          message={'Copied to Clipboard'}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sortBy: state.sortBy
})

const mapDispatchToProps = dispatch => ({
    // copyToClipboard: (id, link) => dispatch(copyToClipboard(id, link)),
    getVideoList: (sortBy) => dispatch(getVideoList(sortBy))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Share))
