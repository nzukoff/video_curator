import React, { Component } from 'react';
import { connect } from 'react-redux'

import Video from '../Video/Video';
import { getVideoList } from '../../actions/index'

export class VideoList extends Component {
  render() {
    return (
      <div className="VideoList">
          {this.props.videos.map((video, i) => <Video key={video.id} index={video.id} />)}
      </div>
    )
  }

  componentDidMount() {
    this.props.getVideoList('voted')
  }
}

const mapStateToProps = state => ({
  videos: state.videos
})

const mapDispatchToProps = dispatch => ({
    getVideoList: (sortBy) => dispatch(getVideoList(sortBy)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList)
