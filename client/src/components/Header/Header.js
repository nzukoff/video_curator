import React from 'react';
import { connect } from 'react-redux'

import { addVideo } from '../../actions/index'

import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    grow: {
        flexGrow: 1,
    },
})

export const Header = (props) => {
    const { classes } = props
    return (
      <div className="Header">
        <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h5" className={classes.grow}>
            World's Best Videos
          </Typography>
          <IconButton onClick={() => props.addVideo()} id="AddButton">
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
      </div>
    )
  }

  const mapDispatchToProps = dispatch => ({
    addVideo: () => dispatch(addVideo())
  })

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Header))