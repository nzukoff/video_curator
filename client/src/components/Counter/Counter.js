import React from 'react';
import { connect } from 'react-redux'

import { castVote } from '../../actions/index'

import { Typography, IconButton } from '@material-ui/core'
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
        <IconButton onClick={() => props.castVote(video.id, "upvote", props.sortBy)} id="UpvoteButton" className={classes.voteButton}>
            <ExpandLess className={classes.voteIcon}/>
        </IconButton>
        <Typography variant="subtitle1" color="textSecondary" component="h3" id="VideoVotes" className={classes.voteCount}>
            {video.votes}
        </Typography>
        <IconButton onClick={() => props.castVote(video.id, "downvote", props.sortBy)} id="DownvoteButton" className={classes.voteButton}>
            <ExpandMore className={classes.voteIcon}/>
        </IconButton>            
      </div>
    )
  }

const mapStateToProps = state => ({
    videos: state.videos,
    sortBy: state.sortBy
})

const mapDispatchToProps = dispatch => ({
    castVote: (index, vote, sortBy) => dispatch(castVote(index, vote, sortBy))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Counter))