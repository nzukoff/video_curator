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

  // it('should create an action to save a newly added video', () => {
  //   const index = 1
  //   const title = 'Brazil'
  //   const expectedAction = {
  //     type: 'SAVED_ADDED_VIDEO',
  //     view: 'video_list',
  //     index: 1,
  //     title: 'Brazil'
  //   }

  //   expect(actions.savedAddedVideo(index, title)).toEqual(expectedAction)
  // })

  it('should create an action to save a newly added video', () => {
    const expectedAction = {
      type: 'SAVED_ADDED_VIDEO'
    }

    expect(actions.savedAddedVideo()).toEqual(expectedAction)
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
      videos: [{title: 'Brazil'}], 
      view: "video_list"
    }

    expect(actions.gotVideoList(videos)).toEqual(expectedAction)
  })

  it('should create an action to embed a video', () => {
    const expectedAction = {
      type: 'EMBED_VIDEO',
      index: 1
    }

    expect(actions.embedVideo(1)).toEqual(expectedAction)
  })

  it('should create an action to save a vote', () => {
    const expectedAction = {
      type: 'CASTED_VOTE'
    }

    expect(actions.castedVote()).toEqual(expectedAction)
  })

  it('should create an action to copy a video', () => {
    const expectedAction = {
      type: 'COPIED_TO_CLIPBOARD',
      id: 1
    }

    expect(actions.copiedToClipboard(1)).toEqual(expectedAction)
  })

  it('should create an action to changed the sorting of the videos', () => {
    const expectedAction = {
      type: 'SORTED_VIDEOS'
    }

    expect(actions.sortedVideos()).toEqual(expectedAction)
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
      { type: 'SORTED_VIDEOS' }, 
      { type: 'GOT_VIDEOS', videos: [ { duration: "00:00", timeSince: "NaN day", title: "The Graduate" } ], view: "video_list", sortBy: "voted" }
    ]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.getVideoList("voted"))
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

    fetchMock
      .getOnce('/api/videos', {
                                body: [
                                    {title: "Dean Town", created:"2018-12-28T00:52:41.000+0000", timeSince:"23 hours", votes:"10"}
                                ],
                                headers: {
                                  'content-type': 'application/json'
                                }
                              })

    // const expectedActions = [
    //   { type: 'GOT_VIDEOS', videos: [ { title: "The Graduate", created:"2018-12-28T00:52:41.000+0000", timeSince:"23 hours", votes: "10" } ], view: "video_list", sortBy: "voted" }
    // ]
    const expectedActions = [
      { type: 'SAVED_ADDED_VIDEO' }
    ]

    // const expectedActions = [{
    //     type: 'SAVED_ADDED_VIDEO',
    //     view: 'video_list',
    //     index: 1,
    //     title: 'Dean Town',
    //     link: 'https://www.youtube.com/watch?v=hAn-DWwHu6E'
    // }]

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

  it('should create GOT_VIDEOS with upvote when an upvote has been casted', async () => {
    // Setup
    fetchMock
      .putOnce('/api/videos/1/upvote', {
                                  body: {
                                    id: 1,
                                    votes: 10
                                  },
                                  headers: {
                                    'content-type': 'application/json'
                                  }
                                })

    fetchMock
      .getOnce('/api/videos', {
                                body: [
                                    {title: "The Graduate", created:"2018-12-28T00:52:41.000+0000", timeSince:"23 hours", votes:"10"}
                                ],
                                headers: {
                                  'content-type': 'application/json'
                                }
                              })

    // const expectedActions = [
    //   { type: 'GOT_VIDEOS', videos: [ { title: "The Graduate", created:"2018-12-28T00:52:41.000+0000", timeSince:"23 hours", votes: "10" } ], view: "video_list", sortBy: "voted" }
    // ]
    const expectedActions = [
      { type: 'CASTED_VOTE' }
    ]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.castVote(1, 'upvote', 'voted'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should create CASTED_VOTE with downvote when an downvote has been casted', async () => {
    // Setup
    fetchMock
      .putOnce('/api/videos/1/downvote', {
                                body: {
                                  id: 1,
                                  votes: 10
                                },
                                headers: {
                                  'content-type': 'application/json'
                                }
                              })

    fetchMock
      .getOnce('/api/videos', {
                                body: [
                                    {title: "The Graduate", created:"2018-12-28T00:52:41.000+0000", timeSince:"23 hours", votes:"10"}
                                ],
                                headers: {
                                  'content-type': 'application/json'
                                }
                              })
    // const expectedActions = [{
    //     type: 'CASTED_VOTE',
    //     index: 1,
    //     votes: 10
    // }]
    const expectedActions = [
      { type: 'CASTED_VOTE' }
    ]

    const store = mockStore()

    // Exercise
    await store.dispatch(actions.castVote(1, 'downvote', 'voted'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  // it('should create COPIED_TO_CLIPBOARD when video has been copied', async () => {
  //   // Setup
  //   // NEED TO MOCK DOCUMENT
  //   const expectedActions = [{
  //       type: 'COPIED_TO_CLIPBOARD',
  //       id: 1
  //   }]
  //   const store = mockStore()
  //
  //   // Exercise
  //   await store.dispatch(actions.copyToClipboard(1, "https://www.youtube.com/watch?v=hAn-DWwHu6E"))
  //   expect(store.getActions()).toEqual(expectedActions)
  // })
})
