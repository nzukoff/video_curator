import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './Header';

// import { shallow } from 'enzyme';
import sinon from 'sinon';

import { createShallow } from '@material-ui/core/test-utils'
import { Typography, Toolbar, IconButton } from '@material-ui/core'

describe('Header', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it('displays the header title', () => {
    // Setup
    const classes = `{root: {
        marginLeft: '10%',
        marginRight: '10%',
      }}`
    const addVideo = sinon.stub()
    const headerWrapper = shallow(<Header addVideo={addVideo} classes={classes} />)
    const title = headerWrapper.find(Toolbar).find(Typography).childAt(0).text()

    // Assert
    expect(title).toBe(`World's Best Videos`)
  });

  it('clicking the "+" button calls the "addVideo()" action creator', () => {
    // Setup
    const classes = `{root: {
        marginLeft: '10%',
        marginRight: '10%',
      }}`
    const addVideo = sinon.stub()
    const headerWrapper = shallow(<Header addVideo={addVideo} classes={classes} />)
    const addButton = headerWrapper.find(Toolbar).find('#AddButton')

    // Exercise
    addButton.simulate('click')

    // Assert
    expect(addButton).toHaveLength(1)
    expect(addVideo.calledOnce).toBe(true)
  })

  it('clicking the sort button "Most Voted" calls the "sortVideos()" action creator', () => {
    // Setup
    const classes = `{root: {
        marginLeft: '10%',
        marginRight: '10%',
      }}`
    const sortVideos = sinon.stub()
    const headerWrapper = shallow(<Header sortVideos={sortVideos} classes={classes} />)
    const sortVotedButton = headerWrapper.find('#SortVoted')

    // Exercise
    sortVotedButton.simulate('click')

    // Assert
    expect(sortVotedButton).toHaveLength(1)
    expect(sortVideos.calledOnce).toBe(true)
    expect(sortVideos.calledWith('voted')).toBe(true)
  })

  it('clicking the sort button "Most Recent" calls the "sortVideos()" action creator', () => {
    // Setup
    const classes = `{root: {
        marginLeft: '10%',
        marginRight: '10%',
      }}`
    const sortVideos = sinon.stub()
    const headerWrapper = shallow(<Header sortVideos={sortVideos} classes={classes} />)
    const sortVotedButton = headerWrapper.find('#SortRecent')

    // Exercise
    sortVotedButton.simulate('click')

    // Assert
    expect(sortVotedButton).toHaveLength(1)
    expect(sortVideos.calledOnce).toBe(true)
    expect(sortVideos.calledWith('recent')).toBe(true)
  })

})