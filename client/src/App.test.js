import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import VideoList from './components/VideoList/VideoList';
import AddVideo from './components/AddVideo/AddVideo';
import EditVideo from './components/EditVideo/EditVideo';

import { shallow } from 'enzyme';
import sinon from 'sinon';

it('displays a logo on start', () => {
  //Setup
  const appWrapper = shallow(<App />);
  const logo = appWrapper.find('.logo');

  // Assert
  expect(logo).toHaveLength(1);
});

it('displays a video list', () => {
  // Setup
  const appWrapper = shallow(<App view="video_list"/>);
  const videoList = appWrapper.find(VideoList);

  // Assert
  expect(videoList).toHaveLength(1);
});

it('displays an "Add Video" button', () => {
  // Setup
  const appWrapper = shallow(<App view="video_list"/>);
  const addVideoButton = appWrapper.find('button');

  // Assert
  expect(addVideoButton).toHaveLength(1);
  expect(addVideoButton.text()).toBe('Add Video')
});

it('clicking the "Add Video" button calls the "addVideo()" action creator', () => {
  // Setup
  const addVideo = sinon.stub()
  const appWrapper = shallow(<App view="video_list" addVideo={addVideo}/>)
  const addButton = appWrapper.find('button')

  // Exercise
  addButton.simulate('click')

  // Assert
  expect(addButton).toHaveLength(1)
  expect(addVideo.calledOnce).toBe(true)
})
