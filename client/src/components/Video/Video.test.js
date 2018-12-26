import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './Video';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { createShallow } from '@material-ui/core/test-utils'
import { Paper, Typography, Grid, IconButton } from '@material-ui/core'

describe('Video Component', () => {
  let shallow
  let videos
  let classes

  beforeEach(() => {
    shallow = createShallow();
    videos = [{ 
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
      timeSince: "16 hours ",
      embedded: "false"
    }]
    classes = `{root: {
      marginLeft: '10%',
      marginRight: '10%',
    }}`
  });

  it('displays video title', () => {
    const videoWrapper = shallow(<Video index={0} classes={classes} videos={videos}/>);
    const displayedTitle = videoWrapper.find(Paper).find(Grid).at(2).find(Typography).at(0).childAt(0)
    expect(displayedTitle).toHaveLength(1);
    expect(displayedTitle.text()).toBe('Dean Town - [05:57]')
  })

  it('displays video thumbnail', () => {
    const videoWrapper = shallow(<Video index={0} classes={classes} videos={videos}/>);
    const displayedThumbnail = videoWrapper.find(Paper).find(Grid).at(1).find('img')
    expect(displayedThumbnail).toHaveLength(1);
  })

  it('clicking the play button calls the embedVideo() action creator', () => {
    // Setup
    const embedVideo = sinon.stub()
    const videoWrapper = shallow(<Video index={0} classes={classes} videos={videos} embedVideo={embedVideo}/>);
    const playButton = videoWrapper.find(Paper).find(Grid).at(2).find(IconButton)

    // const iframe = videoWrapper.find(Paper).find(Grid).at(5).find('div').find('iframe')

    // Exercise
    playButton.simulate('click')

    // Assert
    expect(embedVideo.calledOnce).toBe(true)
    expect(embedVideo.calledWith(0)).toBe(true)
  })

  // it('does not contain an iframe when embedded is false for a video', () => {
  //   // Setup
  //   const videoWrapper = shallow(<Video index={0} classes={classes} videos={videos}/>)
  //   const iframe = videoWrapper.find(Paper).find(Grid).at(5).childAt(0).childAt(0)

  //   // Assert
  //   expect(iframe).toHaveLength(0);
  // })

  // it('contains an iframe when embedded is true for a video', () => {
  //   // Setup
  //   const videos = [{ 
  //     id: 1,
  //     title: "Dean Town",
  //     link: "https://www.youtube.com/watch?v=hAn-DWwHu6E",
  //     ytID: "hAn-DWwHu6E",
  //     duration: "05:57",
  //     dimension: "2d",
  //     definition: "hd",
  //     caption: "false",
  //     licensedContent: "true",
  //     projection: "rectangular",
  //     thumbnail: "https://i.ytimg.com/vi/hAn-DWwHu6E/default.jpg",
  //     created: "2018-12-25T06:05:18.000+0000",
  //     modified: "2018-12-25T06:05:18.000+0000",
  //     timeSince: "16 hours ",
  //     embedded: "true"
  //   }]
  //   const videoWrapper = shallow(<Video index={0} classes={classes} videos={videos}/>)
  //   const iframe = videoWrapper.find(Paper).find(Grid).at(5).find('div').find('iframe')

  //   // Assert
  //   expect(iframe).toHaveLength(1);
  // })

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