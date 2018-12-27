import React from 'react';
import ReactDOM from 'react-dom';

import { Counter } from './Counter';

import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'

// import { shallow } from 'enzyme';
import sinon from 'sinon';

import { createShallow } from '@material-ui/core/test-utils'
import { Typography, IconButton } from '@material-ui/core'


describe('Counter', () => {
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
        timeSince: "16 hours ",
        embedded: "false",
        votes: 1
    }]
    classes = `{controls: {
            textAlign: 'center',
        },
        voting: {
            "&:hover": {
            backgroundColor: "#fff"
            },
        }}`
  });

  it('displays an upvote button', () => {
    // Setup
    const castVote = sinon.stub()
    const counterWrapper = shallow(<Counter castVote={castVote} classes={classes} id={1} videos={videos}/>)
    const upvoteButton = counterWrapper.find(IconButton)

    // Assert
    expect(upvoteButton.at(0).find(ExpandLess)).toHaveLength(1)
  })

  it('displays an downvote button', () => {
    // Setup
    const castVote = sinon.stub()
    const counterWrapper = shallow(<Counter castVote={castVote} classes={classes} id={1} videos={videos}/>)
    const downvoteButton = counterWrapper.find(IconButton)

    // Assert
    expect(downvoteButton.at(1).find(ExpandMore)).toHaveLength(1)
  })

  it('displays the video votes', () => {
    // Setup
    const castVote = sinon.stub()
    const counterWrapper = shallow(<Counter castVote={castVote} classes={classes} id={1} videos={videos}/>)
    const votes = counterWrapper.find(Typography).childAt(0).text()

    // Assert
    expect(votes).toBe('1')
  })

  it('clicking the "upvote" button calls the "castVote()" action creator', () => {
    const castVote = sinon.stub()
    const counterWrapper = shallow(<Counter castVote={castVote} classes={classes} id={1} videos={videos}/>)
    const upvoteButton = counterWrapper.find(IconButton).at(0)

    // Exercise
    upvoteButton.simulate('click')

    // Assert
    expect(castVote.calledOnce).toBe(true)
    expect(castVote.calledWith(1, "upvote")).toBe(true)
  })

  it('clicking the "downvote" button calls the "castVote()" action creator', () => {
    const castVote = sinon.stub()
    const counterWrapper = shallow(<Counter castVote={castVote} classes={classes} id={1} videos={videos}/>)
    const downvoteButton = counterWrapper.find(IconButton).at(1)

    // Exercise
    downvoteButton.simulate('click')

    // Assert
    expect(castVote.calledOnce).toBe(true)
    expect(castVote.calledWith(1, "downvote")).toBe(true)
  })


})