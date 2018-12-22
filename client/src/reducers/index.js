const initialState = {
  view: 'video_list',
  videos: []
}

const rootReducer = (state = initialState, action) => {
  let newVideos

  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        ...state,
        view: action.view
      }

    case 'GOT_VIDEOS':
      return {
        ...state,
        videos: action.videos
      }

    case 'SAVED_ADDED_VIDEO':
      if (action.index < 0) {
        return {
          ...state,
          view: action.view,
        }
      } else {
        return {
          ...state,
          view: action.view,
          videos: [...state.videos, {id: action.index, title: action.title}]
        }
      }

    case 'EDIT_VIDEO':
      return {
        ...state,
        view: action.view,
        editingIndex: action.index
      }

    case 'SAVED_EDITED_VIDEO':
      if (action.index < 0) {
        return {
          ...state,
          view: action.view,
        }
      } else {
        newVideos = state.videos.map(video => {
          if (video.id === action.index) {
            return { id: video.id, title: action.title }
          } else {
            return video
          }
        })
        return {
          ...state,
          view: action.view,
          videos: newVideos
        }
      }

    case 'DELETED_VIDEO':
      newVideos = state.videos.filter(video => video.id !== action.index)
      return {
        ...state,
        view: action.view,
        videos: newVideos
      }

    default:
      return (state)
  }
}

export default rootReducer
