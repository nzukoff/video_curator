import React from 'react';
import { connect } from 'react-redux'

import { editVideo } from '../../actions/index'

export const Video = (props) => (
  <div className="Video">
    <h3><a onClick={() => props.editVideo(props.index, props.title)}>{props.title}</a></h3>
  </div>
)

const mapDispatchToProps = dispatch => ({
  editVideo: (index, title) => dispatch(editVideo(index, title))
})

export default connect(
  null,
  mapDispatchToProps
)(Video)
