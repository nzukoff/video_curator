import React from 'react';

import { App } from './App';
import VideoList from './components/VideoList/VideoList';
import Header from './components/Header/Header'

import { createShallow } from '@material-ui/core/test-utils'

describe('App', () => {
  let shallow

  beforeEach(() => {
    shallow = createShallow()
  });

  it('displays a video list', () => {
    // Setup
    const appWrapper = shallow(<App view="video_list"/>);
    const videoList = appWrapper.find(VideoList);

    // Assert
    expect(videoList).toHaveLength(1);
  });

  it('displays a header', () => {
    // Setup    
    const appWrapper = shallow(
      <App view="video_list"/>
    );

    const header = appWrapper.find(Header);

    // Assert
    expect(header).toHaveLength(1);
  });
})