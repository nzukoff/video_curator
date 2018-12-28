import React from 'react';
import { Video } from './Video';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Counter from '../Counter/Counter'
import VideoDisplay from '../VideoDisplay/VideoDisplay'

import { createShallow } from '@material-ui/core/test-utils'
import { Paper, Grid, Card, CardMedia } from '@material-ui/core'

describe('Video Component', () => {
  let shallow
  let videos
  let classes

  beforeEach(() => {
    shallow = createShallow()
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
      timeSince: "16 hours",
      embedded: false
    }]
    classes = `{paper: {
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: theme.spacing.unit * 4,
    },}`
  });

  it('displays video thumbnail', () => {
    const videoWrapper = shallow(<Video index={1} classes={classes} videos={videos}/>);
    const displayedThumbnail = videoWrapper.find(Paper).find(Grid).at(2).find(CardMedia)
    expect(displayedThumbnail).toHaveLength(1)
    expect(displayedThumbnail.prop('image')).toBe('https://i.ytimg.com/vi/hAn-DWwHu6E/default.jpg')
    expect(displayedThumbnail.prop('component')).toBe('img')
  })

  it('displays a video counter', () => {
    const videoWrapper = shallow(<Video index={1} classes={classes} videos={videos}/>);
    const counter = videoWrapper.find(Paper).find(Grid).at(1).find(Counter)
    expect(counter).toHaveLength(1)
  })

  it('displays a video display', () => {
    const videoWrapper = shallow(<Video index={1} classes={classes} videos={videos}/>);
    const videoDisplay = videoWrapper.find(Paper).find(Grid).at(4).find(VideoDisplay)
    expect(videoDisplay).toHaveLength(1)
  })

  it('does not contain an iframe when embedded is false for a video', () => {
    // Setup
    const videoWrapper = shallow(<Video index={1} classes={classes} videos={videos}/>)
    const iframe = videoWrapper.find(Paper).find(Grid).at(5).find(Card)

    // Assert
    expect(iframe).toHaveLength(0);
  })

  it('contains an iframe when embedded is true for a video', () => {
    // Setup
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
      timeSince: "16 hours",
      embedLink: "https://www.youtube.com/embed/hAn-DWwHu6E",
      embedded: true
    }]
    const videoWrapper = shallow(<Video index={1} classes={classes} videos={videos}/>)
    const iframe = videoWrapper.find(Paper).find(Grid).at(5).find(CardMedia)

    // Assert
    expect(iframe).toHaveLength(1);
    expect(iframe.prop('image')).toBe('https://www.youtube.com/embed/hAn-DWwHu6E')
    expect(iframe.prop('component')).toBe('iframe')

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