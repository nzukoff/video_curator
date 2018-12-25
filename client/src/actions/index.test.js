import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import * as actions from './index'

describe('actions', () => {
  it('should create an action to add a video', () => {
    const expectedAction = {
      type: 'ADD_VIDEO',
      view: 'add_video'
    }

    expect(actions.addVideo()).toEqual(expectedAction)
  })

  it('should create an action to save a newly added video', () => {
    const index = 1
    const title = 'Brazil'
    const expectedAction = {
      type: 'SAVED_ADDED_VIDEO',
      view: 'video_list',
      index: 1,
      title: 'Brazil'
    }

    expect(actions.savedAddedVideo(index, title)).toEqual(expectedAction)
  })

  it('should create an action to edit a selected video', () => {
    const index = 1
    const title = 'Brazil'
    const expectedAction = {
      type: 'EDIT_VIDEO',
      view: 'edit_video',
      index: 1,
      title: 'Brazil'
    }

    expect(actions.editVideo(index, title)).toEqual(expectedAction)
  })

  it('should create an action to save an edited video', () => {
    const index = 1
    const title = 'Brazil'
    const expectedAction = {
      type: 'SAVED_EDITED_VIDEO',
      view: 'video_list',
      index: 1,
      title: 'Brazil'
    }

    expect(actions.savedEditedVideo(index, title)).toEqual(expectedAction)
  })

  it('should create an action to delete a video', () => {
    const index = 1
    const expectedAction = {
      type: 'DELETED_VIDEO',
      view: 'video_list',
      index: 1
    }

    expect(actions.deletedVideo(index)).toEqual(expectedAction)
  })

  it('should create an action to update the [fetched] video list', () => {
    const videos = [{title: 'Brazil'}]
    const expectedAction = {
      type: 'GOT_VIDEOS',
      videos: [{title: 'Brazil'}]
    }

    expect(actions.gotVideoList(videos)).toEqual(expectedAction)
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should create GOT_VIDEOS when videos are fetched', async () => {
    // Setup
    fetchMock
      .getOnce('/api/videos', {
                                body: [
                                   {title: "The Graduate"}
                                ],
                                headers: {
                                  'content-type': 'application/json'
                                }
                              })

    const expectedActions = [
      { type: 'GOT_VIDEOS', videos: [ { duration: "00:00", timeSince: "NaN day", title: "The Graduate" } ] }
    ]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.getVideoList())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create SAVED_ADDED_VIDEO when a new video is posted', async () => {
    // Setup
    fetchMock
      .postOnce('/api/videos',  {
                                  body: {
                                    id: 1, title: "Dean Town", link: "https://www.youtube.com/watch?v=hAn-DWwHu6E"
                                  },
                                  headers: {
                                    'content-type': 'application/json'
                                  }
                                })

    const expectedActions = [{
        type: 'SAVED_ADDED_VIDEO',
        view: 'video_list',
        index: 1,
        title: 'Dean Town',
        link: 'https://www.youtube.com/watch?v=hAn-DWwHu6E'
    }]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.saveAddedVideo("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E"))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create SAVED_EDITED_VIDEO when a video has been edited', async () => {
    // Setup
    fetchMock
      .putOnce('/api/videos/1', {
                                  body: {
                                    id: 1, title: "The Towering Inferno"
                                  },
                                  headers: {
                                    'content-type': 'application/json'
                                  }
                                })

    const expectedActions = [{
        type: 'SAVED_EDITED_VIDEO',
        view: 'video_list',
        index: 1,
        title: 'The Towering Inferno'
    }]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.saveEditedVideo(1, "The Towering Inferno"))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create DELETED_VIDEO when a video is deleted', async () => {
    // Setup
    fetchMock
      .deleteOnce('/api/videos/1', {})

    const expectedActions = [{
        type: 'DELETED_VIDEO',
        view: 'video_list',
        index: 1
    }]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.deleteVideo(1))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
