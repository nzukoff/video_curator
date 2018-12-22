import React, { Component } from 'react';
import { connect } from 'react-redux'

import { saveAddedVideo } from '../../actions/index'

export class AddVideo extends Component {
  constructor(props) {
    super(props)

    this.state = { updatedTitle: '' }
  }

  editTitle = (event) => {
    const target = event.target
    const value = target.value
  
    this.setState({ updatedTitle: value })
  }  

  render() {
    return (
      <div className="AddVideo">
        <form onSubmit={(e) => {e.preventDefault(); this.props.saveAddedVideo(this.state.updatedTitle)}}>
          <input name='title' value={this.state.updatedTitle} onChange={(e) => this.editTitle(e)} autoFocus />
          <button type='button' className="btn btn-secondary" onClick={() => this.props.saveAddedVideo(this.state.updatedTitle)}>Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  saveAddedVideo: (title) => dispatch(saveAddedVideo(title))
})

export default connect(
  null,
  mapDispatchToProps
)(AddVideo)
