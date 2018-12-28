import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addVideo, sortVideos } from '../../actions/index'

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Sort from '@material-ui/icons/Sort'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
        marginBottom: theme.spacing.unit * 4,
    },
    grow: {
        flexGrow: 1,
    },
})

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { anchorEl: null}
  }

  handleClose = () => {
    this.setState({ anchorEl: null }) 
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    
    return (
      <div className="Header">
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h5" className={classes.grow}>
              World's Best Videos
            </Typography>
            <IconButton onClick={(e) => this.handleClick(e)} id="SortButton">
              <Sort />
            </IconButton>
            <Menu
              id='SortMenu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => this.handleClose()}
            >
              <MenuItem id={'SortVoted'} onClick={() => {this.handleClose();this.props.sortVideos("voted")}}>Most Voted</MenuItem>
              <MenuItem id={'SortRecent'} onClick={() => {this.handleClose();this.props.sortVideos("recent")}}>Most Recent</MenuItem>
            </Menu>
            <IconButton onClick={() => this.props.addVideo()} id="AddButton">
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  }

  const mapDispatchToProps = dispatch => ({
    addVideo: () => dispatch(addVideo()),
    sortVideos: (sortBy) => dispatch(sortVideos(sortBy))
  })

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Header))