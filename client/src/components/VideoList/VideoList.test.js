import React from 'react'
import ReactDOM from 'react-dom'
import { VideoList } from './VideoList'
import Video from '../Video/Video'
import { shallow } from 'enzyme'
import sinon from 'sinon'

it('displays a list of video titles', () => {
  const videoData = []
  const getVideoList = sinon.stub()
  const videoListWrapper = shallow(<VideoList videos={videoData} getVideoList={getVideoList} />)
  const videos = videoListWrapper.find(Video)

  expect(videos).toHaveLength(0)
  expect(getVideoList.calledOnce).toBe(true)
});