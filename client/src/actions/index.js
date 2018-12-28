import moment from 'moment';

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

export const embedVideo = (index) => ({
  type: 'EMBED_VIDEO',
  index
})

export const getVideoList = () => {
  return async (dispatch) => {
    const response = await fetch('/api/videos')
    const videos = await response.json()
    const updatedVideos = updateVideos(videos)
    dispatch(gotVideoList(updatedVideos))
  }
}

export const gotVideoList = (videos) => ({
  type: 'GOT_VIDEOS',
  view: 'video_list',
  videos
})

const findDuration = (duration) => {
  const durationM = moment.duration(duration)
  let hours = durationM._data.hours
  if (hours < 10 && hours > 0) {
      hours = `0${hours}`
  }
  let minutes = durationM._data.minutes
  if (minutes < 10) {
      minutes = `0${minutes}`
  }
  let seconds = durationM._data.seconds
  if (seconds < 10) {
      seconds = `0${seconds}`
  }
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

const findTimeSince = (timeCreated) => {
  const hours = Math.ceil(Math.abs(new Date() - new Date(timeCreated)) / (60 * 60 * 1000))
  const hoursSince = hours < 2 ? `${hours} hour ` : `${hours} hours `  
  const days = Math.floor(hours / 24)
  const daysSince = days > 1 ? `${days} days` : `${days} day`
  return hours <= 24 ? hoursSince : daysSince
}

const updateVideos = (videos) => {
  return videos.map((video, i) => {
    const timeSince = findTimeSince(video.created)
    const duration = findDuration(video.duration)
    return {...video, timeSince: timeSince, duration: duration}
  })
}

export const castVote = (index, vote) => {
  return async (dispatch) => {
    const response = await fetch(`/api/videos/${index}/${vote}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({ id: index, title: title })
    })
    const video = await response.json()
    dispatch(castedVote(video.id, video.votes))
  }
}

export const castedVote = (index, votes) => ({
  type: 'CASTED_VOTE',
  index,
  votes
})

export const copyToClipboard = (id, link) => {
  return async (dispatch) => {
    const el = document.createElement('textarea')
    el.value = link
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      let range = document.createRange()
      range.selectNodeContents(el)
      let selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      el.setSelectionRange(0, 999999)
    } else {
      el.select()
    }
    document.execCommand('copy')
    document.body.removeChild(el)
    dispatch(copiedToClipboard(id))
  }
}

export const copiedToClipboard = (id) => ({
  type: 'COPIED_TO_CLIPBOARD',
  id
})

export const sortVideos = (sortBy) => ({
  type: 'SORT_VIDEOS',
  sortBy
})