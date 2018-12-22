import React from 'react';
import ReactDOM from 'react-dom';
import { EditVideo } from './EditVideo';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('creates a means to edit a video', () => {
  const videos = [{ id: 1, title: 'Blade' }]
  const editVideoWrapper = shallow(<EditVideo videos={videos} editingIndex={1} />)
})

it('contains a "Save" button that calls the action creator', () => {
  // Setup
  const videos = [{ id: 1, title: 'Blade' }]
  const saveEditedVideo = sinon.stub()
  const editVideoWrapper = shallow(<EditVideo saveEditedVideo={saveEditedVideo} editingIndex={1} videos={videos}/>)
  editVideoWrapper.setState({updatedTitle: 'Jaws'})
  const saveButton = editVideoWrapper.find('button').find({name: 'enter'})

  // Exercise
  saveButton.simulate('click')

  // Assert
  expect(saveButton).toHaveLength(1)
  expect(saveEditedVideo.calledOnce).toBe(true)
  expect(saveEditedVideo.calledWith(1, 'Jaws')).toBe(true)
})

it('accepts a default title', () => {
  // Setup
  const videos = [{ id: 1, title: 'Blade' }]
  const editVideoWrapper = shallow(<EditVideo editingIndex={1} videos={videos} />)
  editVideoWrapper.setState({updatedTitle: 'Jaws'})

  // Assert
  expect(editVideoWrapper.find({value: 'Jaws'})).toHaveLength(1)
})

it('displays a delete button', () => {
  // Setup
  const videos = [{ id: 1, title: 'Blade' }]
  const editVideoWrapper = shallow(<EditVideo videos={videos} editingIndex={1} />)
  const deleteButton = editVideoWrapper.find('form').find({name: 'delete'})

  // Assert
  expect(deleteButton).toHaveLength(1)
})

it('contains a "Delete" button that calls the action creator', () => {
  // Setup
  const videos = [{ id: 1, title: 'Blade' }]
  const deleteVideo = sinon.stub()
  const editVideoWrapper = shallow(<EditVideo editingIndex={1} deleteVideo={deleteVideo} videos={videos}/>);
  const deleteButton = editVideoWrapper.find('button').find({name: 'delete'})

  // Exercise
  deleteButton.simulate('click')

  // Assert
  expect(deleteButton).toHaveLength(1)
  expect(deleteVideo.calledOnce).toBe(true)
  expect(deleteVideo.calledWith(1)).toBe(true)
})
