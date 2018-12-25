import React from 'react';
import { connect } from 'react-redux'

import { editVideo } from '../../actions/index'
// import PlayWindow from '../PlayWindow/PlayWindow';

import { Paper, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '30px',
  },
})

export const Video = (props) => {
    const { classes } = props
    return (
      <div className="Video">
        <Paper className={classes.paper} elevation={1}>
          <Grid container>
            <Grid item sm={2}>
              <img className="thumbnail" src={props.videos[props.index].thumbnail}/>
            </Grid>
            <Grid item sm>
              <Typography variant="h6" component="h3" component="a" href={props.videos[props.index].link} style={{textDecoration:'none'}}>
                {`${props.videos[props.index].title} - [${props.videos[props.index].duration}]`}
              </Typography>
              <Typography variant="body2" component="h3">
                Submitted {props.videos[props.index].timeSince} ago
              </Typography>
            </Grid> 
            <Grid item>
              {/* <PlayWindow /> */}
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }

  const mapStateToProps = state => ({
    videos: state.videos
  })

const mapDispatchToProps = dispatch => ({
  editVideo: (index, title) => dispatch(editVideo(index, title))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Video))