import React from 'react';
import { VideoDisplay } from './VideoDisplay';
import sinon from 'sinon';

import { createShallow } from '@material-ui/core/test-utils'
import { Typography, IconButton } from '@material-ui/core'

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
      timeSince: "16 hours",
      embedded: "false"
    }]
    classes = `{root: {
      marginLeft: '10%',
      marginRight: '10%',
    }}`
  });

  it('displays video title', () => {
    const videoDisplayWrapper = shallow(<VideoDisplay id={1} classes={classes} videos={videos}/>);
    const displayedTitle = videoDisplayWrapper.find(Typography).at(0)
    expect(displayedTitle).toHaveLength(1);
    expect(displayedTitle.childAt(0).text()).toBe('Dean Town - [05:57]')
    expect(displayedTitle.prop('component')).toBe('a')
    
  })

  it('displays the time since video was posted', () => {
    const videoDisplayWrapper = shallow(<VideoDisplay id={1} classes={classes} videos={videos}/>);
    const displayedTitle = videoDisplayWrapper.find(Typography).at(1).childAt(0)
    expect(displayedTitle).toHaveLength(1);
    expect(displayedTitle.text()).toBe('Submitted 16 hours ago')
    
  })

  it('clicking the play button calls the embedVideo() action creator', () => {
    // Setup
    const embedVideo = sinon.stub()
    const videoDisplayWrapper = shallow(<VideoDisplay id={1} classes={classes} videos={videos} embedVideo={embedVideo}/>);
    const playButton = videoDisplayWrapper.find(IconButton)

    // Exercise
    playButton.simulate('click')

    // Assert
    expect(embedVideo.calledOnce).toBe(true)
    expect(embedVideo.calledWith(1)).toBe(true)
  })

  it('clicking the "copy link" button calls the copyToClipboard() action creator', () => {
    // Setup
    const copyToClipboard = sinon.stub()
    const videoDisplayWrapper = shallow(<VideoDisplay id={1} classes={classes} videos={videos} copyToClipboard={copyToClipboard}/>);
    const copyLinkButton = videoDisplayWrapper.find('#CopyLink')

    // Exercise
    copyLinkButton.simulate('click')

    // Assert
    expect(copyToClipboard.calledOnce).toBe(true)
    expect(copyToClipboard.calledWith(1, 'https://www.youtube.com/watch?v=hAn-DWwHu6E')).toBe(true)
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