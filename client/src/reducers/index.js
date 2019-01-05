const initialState = {
  view: 'video_list',
  videos: []
}

const rootReducer = (state = initialState, action) => {
  let newVideos

  const sortVideos = (sortBy, videos) => {
    console.log("SORT BY PASSED INTO SORT VIDEO IS ", sortBy)
    if (sortBy === 'voted') {
      return [...state.videos].sort((v1, v2) => parseInt(v2.votes) - parseInt(v1.votes))
    } else if (sortBy === 'recent') {
      return [...state.videos].sort((v1, v2) => {
        if (new Date(v2.created) > new Date(v1.created)) {
          return 1
        } else {
          return -1
        }
      })
    }
  }

  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        ...state,
        view: action.view
      }

    case 'GOT_VIDEOS':
      return {
        ...state,
        videos: action.videos,
        view: action.view, 
        sortBy: action.sortBy
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
          videos: [...state.videos, {id: action.index, title: action.title, url: action.url}]
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

    case 'EMBED_VIDEO':
      newVideos = state.videos.map(video => {
        if (video.id === action.index) {
          return { ...video, embedded: !video.embedded}
        } else {
          return video
        }
      })
      return {
        ...state,
        videos: newVideos
      }

    case 'SHARE_VIDEO':
      newVideos = state.videos.map(video => {
        if (video.id === action.index) {
          return { ...video, shared: !video.shared}
        } else {
          return video
        }
      })
      return {
        ...state,
        videos: newVideos
      }

    // case 'CASTED_VOTE':
    //   newVideos = state.videos.map(video => {
    //     if (video.id === action.index) {
    //       return { ...video, votes: action.votes}
    //     } else {
    //       return video
    //     }
    //   })
    //   return {
    //     ...state,
    //     videos: newVideos
    //   }

    // case 'SORT_VIDEOS':
    //   if (action.sortBy === 'voted') {
    //     newVideos = [...state.videos].sort((v1, v2) => parseInt(v2.votes) - parseInt(v1.votes))
    //   } else if (action.sortBy === 'recent') {
    //     newVideos = [...state.videos].sort((v1, v2) => {
    //       if (new Date(v2.created) > new Date(v1.created)) {
    //         return 1
    //       } else {
    //         return -1
    //       }
    //     })
    //   }
  
    //   return {
    //     ...state,
    //     videos: newVideos,
    //     sortedBy: action.sortBy
    //   }
    
    default:
      return (state)
  }
}

export default rootReducer
