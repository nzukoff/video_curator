import React from 'react';
import { connect } from 'react-redux'

import { editVideo, embedVideo, copyToClipboard } from '../../actions/index'

import { Typography, IconButton, Button } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  playIcon: {
    height: 30,
    width: 30,
    [theme.breakpoints.down('sm')]: {
      height: 15,
      width: 15,
    },
  },
  text: {
    fontSize: '1.3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    textDecoration:'none',
  },
  subtext: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.7rem',
    },
    fontSize: '1rem',
  },
  buttonText: {
    fontSize: '.90rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.75rem',
    },
    textDecoration:'none',
  },
})

export const VideoDisplay = (props) => {
    const video = props.videos.find(video => video.id===props.id)
    const { classes } = props
    return (
      <div className="VideoDisplay">
        <Typography variant="h6" component="a" href={video.link} className={classes.text}>
            {`${video.title} - [${video.duration}]`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="h3" className={classes.subtext}>
            {`Submitted ${video.timeSince} ago`}
        </Typography>
        <IconButton aria-label="Play/pause" onClick={() => props.embedVideo(props.id)} id="PlayButton">
            <PlayArrowIcon className={classes.playIcon}/>
        </IconButton>
        <Button onClick={() => props.copyToClipboard(video.id, video.link)} className={classes.buttonText} id="CopyLink">
            Copy Link
        </Button>
      </div>
    )
  }

const mapStateToProps = state => ({
  videos: state.videos
})

const mapDispatchToProps = dispatch => ({
  editVideo: (index, title) => dispatch(editVideo(index, title)),
  embedVideo: (index) => dispatch(embedVideo(index)),
  copyToClipboard: (id, link) => dispatch(copyToClipboard(id, link))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(VideoDisplay))