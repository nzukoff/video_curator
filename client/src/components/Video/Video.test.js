import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './Video';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('displays video title', () => {
  const title = 'Star Wars';
  const videoListWrapper = shallow(<Video title={title} />);
  const displayedTitle = videoListWrapper.find('h3');
  expect(displayedTitle).toHaveLength(1);
  expect(displayedTitle.text()).toBe('Star Wars')
})

it('contains clickable "Edit" title text that calls the action creator', () => {
  // Setup
  const editVideo = sinon.stub()
  const videoWrapper = shallow(<Video editVideo={editVideo} />)
  const videoTitleLink = videoWrapper.find('a')

  // Exercise
  videoTitleLink.simulate('click')

  // Assert
  expect(videoTitleLink).toHaveLength(1)
  expect(editVideo.calledOnce).toBe(true)
})
