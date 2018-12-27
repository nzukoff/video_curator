import React from 'react';
import { connect } from 'react-redux'

import { editVideo, embedVideo } from '../../actions/index'

import Counter from '../Counter/Counter'

import { Paper, Typography, Grid, IconButton, Button } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    // ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: theme.spacing.unit * 4,
  },
  thumbnail: {
    display: 'flex',
    width: '180px',
  },
  iframe: {
    paddingTop: theme.spacing.unit * 4,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 30,
    width: 30,
  },
  voting: {
    "&:hover": {
      backgroundColor: "#fff"
    },
  }
})

export const Video = (props) => {
    const video = props.videos.find(video => video.id===props.index)
    const copyToClipboard = () => {
      const el = document.createElement('textarea');
      el.value = video.link;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    const { classes } = props
    return (
      <div className="Video">
        <Paper className={classes.paper} elevation={1}>
          <Grid container >
            <Grid container item xs={2} md={1}  direction="column">
              <Counter id={video.id}/>
            </Grid>
            <Grid container item xs={10} md={3} alignItems="center" justify="center">
              <img className={classes.thumbnail} src={video.thumbnail} onClick={() => props.embedVideo(props.index)}/>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" component="a" href={video.link} style={{textDecoration:'none', paddingTop:'10px'}}>
                {`${video.title} - [${video.duration}]`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" component="h3">
                {`Submitted ${video.timeSince} ago`}
              </Typography>
              <div className={classes.controls}>
                <IconButton aria-label="Play/pause" onClick={() => props.embedVideo(props.index)}>
                  <PlayArrowIcon className={classes.playIcon}/>
                </IconButton>
                <Button onClick={() => copyToClipboard()} id="CopyLink">
                  Copy Link
                </Button>
              </div>
            </Grid>             
          </Grid>
          <Grid container className={classes.container}>
            <Grid item md={3}></Grid>
            <Grid item xs={12} md={6}>
              {video.embedded ? <div className={classes.iframe}><iframe width="560" height="315" src={video.embedLink} frameBorder="0" allowFullScreen></iframe></div>: <div></div>}
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

const mapStateToProps = state => ({
  videos: state.videos
})

const mapDispatchToProps = dispatch => ({
  editVideo: (index, title) => dispatch(editVideo(index, title)),
  embedVideo: (index) => dispatch(embedVideo(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Video))