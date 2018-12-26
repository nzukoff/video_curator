import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import VideoList from './components/VideoList/VideoList';
import AddVideo from './components/AddVideo/AddVideo';
import EditVideo from './components/EditVideo/EditVideo';
import Header from './components/Header/Header'

// import { shallow } from 'enzyme';
import sinon from 'sinon';

import { createShallow, createMount } from '@material-ui/core/test-utils'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'


describe('App', () => {
  let shallow
  let mount

  beforeEach(() => {
    shallow = createShallow()
    mount = createMount()
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
    // const shallow = createShallow()
    
    const appWrapper = shallow(
      <App view="video_list"/>
    );

    const header = appWrapper.find(Header);

    // Assert
    expect(header).toHaveLength(1);
  });
})