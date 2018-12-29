import moment from 'moment';

export const getVideoList = (sortBy) => {
  return async (dispatch) => {
    const response = await fetch('/api/videos')
    const videos = await response.json()
    const updatedVideos = updateVideos(videos)
    const videosSorted = sortVideos(updatedVideos, sortBy)
    dispatch(sortedVideos())
    dispatch(gotVideoList(videosSorted, sortBy))
  }
}

export const gotVideoList = (videos, sortBy) => ({
  type: 'GOT_VIDEOS',
  view: 'video_list',
  videos,
  sortBy
})

export const addVideo = () => ({
  type: 'ADD_VIDEO',
  view: 'add_video'
})

export const saveAddedVideo = (title, link, sortBy) => {
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
    dispatch(savedAddedVideo())
    dispatch(getVideoList(sortBy))
  }
}

export const savedAddedVideo = () => ({
  type: 'SAVED_ADDED_VIDEO'
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
    })
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

export const sortedVideos = () => ({
  type: 'SORTED_VIDEOS'
})

export const castedVote = () => ({
  type: 'CASTED_VOTE'
})

const sortVideos = (videos, sortBy) => {
  if (sortBy === 'voted') {
    return [...videos].sort((v1, v2) => parseInt(v2.votes) - parseInt(v1.votes))
  } else if (sortBy === 'recent') {
    return [...videos].sort((v1, v2) => {
      if (new Date(v2.created) > new Date(v1.created)) {
        return 1
      } else {
        return -1
      }
    })
  }
}

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

export const castVote = (index, vote, sortBy) => {
  return async (dispatch) => {
    const response = await fetch(`/api/videos/${index}/${vote}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const video = await response.json()
    dispatch(castedVote())
    dispatch(getVideoList(sortBy))
  }
}

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