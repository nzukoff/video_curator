export const addVideo = () => ({
  type: 'ADD_VIDEO',
  view: 'add_video'
})

export const saveAddedVideo = (title, link) => {
  return async (dispatch) => {
    const ytID = link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)[1];
    const response = await fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: 0, title, link, ytID })
    })
    const video = await response.json()
    dispatch(savedAddedVideo(video.id, video.title, video.link))
  }
}

export const savedAddedVideo = (index, title, link) => ({
  type: 'SAVED_ADDED_VIDEO',
  view: 'video_list',
  index,
  title, 
  link
})

export const editVideo = (index, title) => ({
  type: 'EDIT_VIDEO',
  view: 'edit_video',
  index,
  title
})

export const saveEditedVideo = (index, title) => {
  return async (dispatch) => {
    const response = await fetch(`/api/videos/${index}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: index, title: title })
    })
    const video = await response.json()
    dispatch(savedEditedVideo(video.id, video.title))
  }
}

export const savedEditedVideo = (index, title) => ({
  type: 'SAVED_EDITED_VIDEO',
  view: 'video_list',
  index,
  title
})

export const deleteVideo = (index) => {
  return async (dispatch) => {
    await fetch(`/api/videos/${index}`, {
      method: 'DELETE'
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({ id: index })
    })
    // const video = await response.json()
    dispatch(deletedVideo(index))
  }
}

export const deletedVideo = (index) => ({
  type: 'DELETED_VIDEO',
  view: 'video_list',
  index
})

export const getVideoList = () => {
  return async (dispatch) => {
    const response = await fetch('/api/videos')
    const videos = await response.json()
    dispatch(gotVideoList(videos))
  }
}

export const gotVideoList = (videos) => ({
  type: 'GOT_VIDEOS',
  videos
})
