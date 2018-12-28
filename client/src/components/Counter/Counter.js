import React from 'react';
import { connect } from 'react-redux'

import { castVote } from '../../actions/index'

import { Typography, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  controls: {
    textAlign: 'center',
  },
  voteButton: {
    "&:hover": {
      backgroundColor: "#fff"
    },
  },
  voteIcon: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.80rem',
    },
  },
  voteCount: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.75rem',
    },
  }
})

export const Counter = (props) => {
    const { classes } = props
    const video = props.videos.find(video => video.id===props.id)
    return (
      <div className={classes.controls}>        
        <IconButton onClick={() => props.castVote(video.id, "upvote")} id="UpvoteButton" className={classes.voteButton}>
            <ExpandLess className={classes.voteIcon}/>
        </IconButton>
        <Typography variant="subtitle1" color="textSecondary" component="h3" id="VideoVotes" className={classes.voteCount}>
            {video.votes}
        </Typography>
        <IconButton onClick={() => props.castVote(video.id, "downvote")} id="DownvoteButton" className={classes.voteButton}>
            <ExpandMore className={classes.voteIcon}/>
        </IconButton>            
      </div>
    )
  }

const mapStateToProps = state => ({
    videos: state.videos
})

const mapDispatchToProps = dispatch => ({
    castVote: (index, vote) => dispatch(castVote(index, vote))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Counter))