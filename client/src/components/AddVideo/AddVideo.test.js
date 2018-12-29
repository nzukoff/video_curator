import React from 'react'
import { AddVideo } from './AddVideo'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { createMount } from '@material-ui/core/test-utils'
import { Button } from '@material-ui/core'

describe('AddVideo', () => {

  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  it('creates a means to add a new video', () => {
    const addVideoWrapper = shallow(<AddVideo />)
  })

  it('contains an "Add Video" button that calls the saveAddedVideo() action creator', () => {
    // Setup
    const saveAddedVideo = sinon.stub()
    const addVideoWrapper = mount(<AddVideo saveAddedVideo={saveAddedVideo} />);
    const addButton = addVideoWrapper.find(Button).at(1)
    addVideoWrapper.setState({updatedTitle: 'Dean Town', link: 'https://www.youtube.com/watch?v=hAn-DWwHu6E'})

    // Exercise
    addButton.simulate('click')

    // Assert
    expect(addButton).toHaveLength(1)
    expect(saveAddedVideo.calledOnce).toBe(true)
    expect(saveAddedVideo.calledWith('Dean Town', 'https://www.youtube.com/watch?v=hAn-DWwHu6E')).toBe(true)
    expect(addButton.text()).toEqual('Add Video')
  })

  it('contains an "Cancel" button that calls the getVideoList() action creator', () => {
    // Setup
    const getVideoList = sinon.stub()
    const addVideoWrapper = shallow(<AddVideo getVideoList={getVideoList} sortBy={'recent'} />)
    const cancelButton = addVideoWrapper.find(Button).at(0)

    // Exercise
    cancelButton.simulate('click')

    // Assert
    expect(getVideoList.calledOnce).toBe(true)
    expect(getVideoList.calledWith('recent')).toBe(true)



    


    // // Setup
    // const getVideoList = sinon.stub()
    // const addVideoWrapper = mount(<AddVideo getVideoList={getVideoList} />);
    // const cancelButton = addVideoWrapper.find(Button).at(0)
    // addVideoWrapper.setState({updatedTitle: 'Dean Town', link: 'https://www.youtube.com/watch?v=hAn-DWwHu6E'})

    // // Exercise
    // cancelButton.simulate('click')

    // // Assert
    // expect(getVideoList.calledOnce).toBe(true)
    // expect(cancelButton.text()).toEqual('Cancel')
  })
})