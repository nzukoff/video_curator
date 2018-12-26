import React from 'react';
import { connect } from 'react-redux'

import { editVideo, embedVideo } from '../../actions/index'

import { Paper, Typography, Grid, IconButton } from '@material-ui/core'
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
  container: {
    display: 'flex',
    height: '100%',
    flex: '1 100%',
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
})

export const Video = (props) => {
    const { classes } = props
    return (
      <div className="Video">
        <Paper className={classes.paper} elevation={1}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <img className={classes.thumbnail} src={props.videos[props.index].thumbnail} onClick={() => props.embedVideo(props.index)}/>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h6" component="a" href={props.videos[props.index].link} style={{textDecoration:'none', paddingTop:'10px'}}>
                {`${props.videos[props.index].title} - [${props.videos[props.index].duration}]`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" component="h3">
                {`Submitted ${props.videos[props.index].timeSince} ago`}
              </Typography>
              <div className={classes.controls}>
                <IconButton aria-label="Play/pause" onClick={() => props.embedVideo(props.index)}>
                  <PlayArrowIcon className={classes.playIcon}/>
                </IconButton>
              </div>
            </Grid>             
          </Grid>
          <Grid container className={classes.container}>
            <Grid item md={3}></Grid>
            <Grid item xs={12} md={6}>
              {props.videos[props.index].embedded ? <div className={classes.iframe}><iframe width="560" height="315" src={props.videos[props.index].embedLink} frameBorder="0" allowFullScreen></iframe></div>: <div></div>}
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