import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './Video';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { createShallow } from '@material-ui/core/test-utils'
import { Paper, Typography, Grid } from '@material-ui/core'

describe('Video Component', () => {

  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('displays video title', () => {
    const classes = `{root: {
      marginLeft: '10%',
      marginRight: '10%',
    }}`
    const videos = [{ 
        id: 1,
        title: "Dean Town",
        link: "https://www.youtube.com/watch?v=hAn-DWwHu6E",
        ytID: "hAn-DWwHu6E",
        duration: "05:57",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: "true",
        projection: "rectangular",
        thumbnail: "https://i.ytimg.com/vi/hAn-DWwHu6E/default.jpg",
        created: "2018-12-25T06:05:18.000+0000",
        modified: "2018-12-25T06:05:18.000+0000",
        timeSince: "16 hours "
      }]
    
    const videoListWrapper = shallow(<Video index={0} classes={classes} videos={videos}/>);
    const displayedTitle = videoListWrapper.find(Paper).dive().childAt(0).dive().childAt(1).dive().childAt(0);
    expect(displayedTitle).toHaveLength(1);
    expect(displayedTitle.childAt(0).text()).toBe('Dean Town - [05:57]')
  })

  // it('contains clickable "Edit" title text that calls the action creator', () => {
  //   // Setup
  //   const editVideo = sinon.stub()
  //   const videoWrapper = shallow(<Video editVideo={editVideo} />)
  //   const videoTitleLink = videoWrapper.find('a')

  //   // Exercise
  //   videoTitleLink.simulate('click')

  //   // Assert
  //   expect(videoTitleLink).toHaveLength(1)
  //   expect(editVideo.calledOnce).toBe(true)
  // })

})