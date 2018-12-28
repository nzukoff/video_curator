import React from 'react';
import { connect } from 'react-redux'

import { embedVideo } from '../../actions/index'

import Counter from '../Counter/Counter'
import VideoDisplay from '../VideoDisplay/VideoDisplay'

import { Paper, Grid, Card, CardMedia } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: theme.spacing.unit * 4,
  },
  iframe: {
    [theme.breakpoints.down('sm')]: {
      width: '255px',
      height: '143px',
    },
    [theme.breakpoints.up('md')]: {
      width: '420px',
      height: '236px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '560px',
      height: '315px',
    },
  },
  imageCard: {
    maxWidth: 180,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 100,
      maxHeight: 100,
    },
  },
  iframeContainer: {
    paddingBottom: theme.spacing.unit * 4,

  },
  videoInfo: {
    paddingLeft: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  },
})

export const Video = (props) => {
    const video = props.videos.find(video => video.id===props.index)
    const { classes } = props
    return (
      <div className="Video">
        <Paper className={classes.paper} elevation={1}>
          <Grid container alignItems={'center'} className={classes.videoInfo}>
            <Grid item xs={2} sm={1} className={classes.counter}  >
              <Counter id={video.id}/>
            </Grid>
            <Grid item xs={10} sm={2} className={classes.thumbnail}>
              <Card className={classes.imageCard} onClick={() => props.embedVideo(props.index)} id="VideoThumbnail">
                <CardMedia
                  image={video.thumbnail}
                  title={video.title}
                  component='img'
                />
              </Card>
            </Grid>
            <Grid item xs={2} sm={1} >
            </Grid>
            <Grid item xs={10} sm={8} >
              <VideoDisplay id={props.index}/>
            </Grid>             
          </Grid>
          <Grid container justify='center'>
              {video.embedded ? <div className={classes.iframeContainer}><Card><CardMedia image={video.embedLink} id='Iframe' component={'iframe'} className={classes.iframe} frameBorder="0" allowFullScreen/></Card></div>: <div></div>}
          </Grid>
        </Paper>
      </div>
    )
  }

const mapStateToProps = state => ({
  videos: state.videos
})

const mapDispatchToProps = dispatch => ({
  embedVideo: (index) => dispatch(embedVideo(index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Video))