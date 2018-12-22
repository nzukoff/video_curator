import React from 'react'
import { AddVideo } from './AddVideo'
import { shallow } from 'enzyme'
import sinon from 'sinon'

it('creates a means to add a new video', () => {
  const addVideoWrapper = shallow(<AddVideo />)
})

it('contains an "Add" button that calls the action creator', () => {
  // Setup
  const saveAddedVideo = sinon.stub()
  const addVideoWrapper = shallow(<AddVideo saveAddedVideo={saveAddedVideo} />);
  const addButton = addVideoWrapper.find('button')
  addVideoWrapper.setState({updatedTitle: 'Jaws'})

  // Exercise
  addButton.simulate('click')

  // Assert
  expect(addButton).toHaveLength(1)
  expect(saveAddedVideo.calledOnce).toBe(true)
  expect(saveAddedVideo.calledWith('Jaws')).toBe(true)
})
