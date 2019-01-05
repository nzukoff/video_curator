import reducer from './index'

describe('reducer', () => {
  it('should return the initial state', () => {
    const expected = {
      view: 'video_list',
      videos: []
    }

    expect(reducer(undefined, {})).toEqual(expected)
  })

  it('should return new view and blank updated title', () => {
    const initialState = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ]
    }

    const expected = {
      view: 'add_video',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ]
    }

    expect(reducer(initialState, {
                                   type: 'ADD_VIDEO',
                                   view: 'add_video'
                                 }
           )).toEqual(expected)
  })

  it('should return state with new video added and new view', () => {
    const initialState = {
      view: 'add_video',
      videos: [
        {id: 1, title: 'Star Wars IV', url: 'https://www.youtube.com/watch?v=yHfLyMAHrQE'},
        {id: 2, title: 'Star Trek II', url: 'https://www.youtube.com/watch?v=gYbW1F_c9eM'}
      ]
    }

    const expected = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV', url: 'https://www.youtube.com/watch?v=yHfLyMAHrQE'},
        {id: 2, title: 'Star Trek II', url: 'https://www.youtube.com/watch?v=gYbW1F_c9eM'},
        {id: 3, title: 'Brazil', url: 'https://www.youtube.com/watch?v=QHgh77iE6qc'}
      ]
    }

    expect(reducer(initialState, {
                                   type: 'SAVED_ADDED_VIDEO',
                                   view: 'video_list',
                                   index: 3,
                                   title: 'Brazil', 
                                   url: 'https://www.youtube.com/watch?v=QHgh77iE6qc'
                                 }
           )).toEqual(expected)
  })

  it('should return same video list and new view if new title is blank', () => {
    const initialState = {
      view: 'add_video',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ]
    }

    const expected = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ]
    }

    expect(reducer(initialState, {
                                   type: 'SAVED_ADDED_VIDEO',
                                   title: '',
                                   view: 'video_list',
                                   index: -1
                                 }
           )).toEqual(expected)
  })

  it('should return new view, updated title, and editing index', () => {
    const initialState = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ]
    }

    const expected = {
      view: 'edit_video',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ],
      editingIndex: 1
    }

    expect(reducer(initialState, {
                                   type: 'EDIT_VIDEO',
                                   view: 'edit_video',
                                   index: 1
                                 }
           )).toEqual(expected)
  })

  it('should return state with edited video and new view', () => {
    const initialState = {
      view: 'edit_video',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title:'Star Trek II'}
      ],
      editingIndex: 2
    }

    const expected = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Buckaroo Banzai'}
      ],
      editingIndex: 2
    }

    expect(reducer(initialState, {
                                   type: 'SAVED_EDITED_VIDEO',
                                   view: 'video_list',
                                   index: 2,
                                   title: 'Buckaroo Banzai'
                                 }
           )).toEqual(expected)
  })

  it('should return state with embedded video', () => {
    const initialState = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title:'Star Trek II'}
      ],
    }

    const expected = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV', embedded:true},
        {id: 2, title: 'Star Trek II'}
      ]
    }

    expect(reducer(initialState, {
                                   type: 'EMBED_VIDEO',
                                   index: 1,
                                 }
           )).toEqual(expected)
  })

  it('should return same video list and new view if new title is blank', () => {
    const initialState = {
      view: 'edit_video',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ],
      editingIndex: 1
    }

    const expected = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ],
      editingIndex: 1
    }

    expect(reducer(initialState, {
                                   type: 'SAVED_EDITED_VIDEO',
                                   title: '',
                                   view: 'video_list',
                                   index: -1
                                 }
           )).toEqual(expected)
  })

  it('should return state with deleted video removed from list', () => {
    const initialState = {
      view: 'edit_video',
      videos: [
        {id: 1, title: 'Star Wars IV'},
        {id: 2, title: 'Star Trek II'}
      ],
      editingIndex: 2
    }

    const expected = {
      view: 'video_list',
      videos: [
        {id: 1, title: 'Star Wars IV'}
      ],
      editingIndex: 2
    }

    expect(reducer(initialState, {
                                   type: 'DELETED_VIDEO',
                                   view: 'video_list',
                                   index: 2
                                 }
           )).toEqual(expected)
  })

  // it('should return state with votes for a video', () => {
  //   const initialState = {
  //     view: 'video_list',
  //     videos: [
  //       {id: 1, title: 'Star Wars IV'},
  //       {id: 2, title:'Star Trek II'}
  //     ],
  //   }

  //   const expected = {
  //     view: 'video_list',
  //     videos: [
  //       {id: 1, title: 'Star Wars IV', votes:10},
  //       {id: 2, title: 'Star Trek II'}
  //     ]
  //   }

  //   expect(reducer(initialState, {
  //                                  type: 'CASTED_VOTE',
  //                                  index: 1,
  //                                  votes: 10
  //                                }
  //          )).toEqual(expected)
  // })

  // it('should return state with the sorted by method and correct sort for method', () => {
  //   const initialState = {
  //     view: 'video_list',
  //     sortedBy: 'voted',
  //     videos: [
  //       {id: 1, title: 'Dean Town', votes:3, created:'2018-12-27T10:39:40.000+0000'},
  //       {id: 2, title:'Egg Drop', votes:5, created:'2018-12-28T03:34:04.000+0000'}
  //     ],
  //   }

  //   const expected = {
  //     view: 'video_list',
  //     sortedBy: 'recent',
  //     videos: [
  //       {id: 2, title:'Egg Drop', votes:5, created:'2018-12-28T03:34:04.000+0000'},
  //       {id: 1, title: 'Dean Town', votes:3, created:'2018-12-27T10:39:40.000+0000'}
  //     ]
  //   }

  //   expect(reducer(initialState, {
  //                                  type: 'SORT_VIDEOS',
  //                                  sortBy: 'recent'
  //                                }
  //          )).toEqual(expected)
  // })
})
