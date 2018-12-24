import React, { Component } from 'react';
import { connect } from 'react-redux'

import { saveAddedVideo } from '../../actions/index'

export class AddVideo extends Component {
  constructor(props) {
    super(props)

    this.state = { updatedTitle: '', link: '' }
  }

  editTitle = (event) => {
    const target = event.target
    const value = target.value
  
    this.setState({ updatedTitle: value })
  }  

  editLink = (event) => {
    const target = event.target
    const value = target.value
  
    this.setState({ link: value })
  }

  render() {
    return (
      <div className="AddVideo">
        <form onSubmit={(e) => {e.preventDefault(); this.props.saveAddedVideo(this.state.updatedTitle)}}>
          <input name='title' value={this.state.updatedTitle} onChange={(e) => this.editTitle(e)} autoFocus />
          <input name='link' value={this.state.link} onChange={(e) => this.editLink(e)} />
          <button type='button' className="btn btn-secondary" onClick={() => this.props.saveAddedVideo(this.state.updatedTitle, this.state.link)}>Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  saveAddedVideo: (title, link) => dispatch(saveAddedVideo(title, link))
})

export default connect(
  null,
  mapDispatchToProps
)(AddVideo)
