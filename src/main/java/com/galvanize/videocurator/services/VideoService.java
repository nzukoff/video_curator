package com.galvanize.videocurator.services;

import com.galvanize.videocurator.models.Video;
import com.galvanize.videocurator.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public List<Video> getVideoList() {
        return videoRepository.findAllByOrderByIdAsc();
    }

    public Video addVideo(Video video) {
        String title = video.getTitle().trim();
        if (!title.equals("")) {
            Video newVideo = new Video(title);
            return(videoRepository.save(newVideo));
        } else {
            return new Video(-1);
        }
    }

    public Video editVideo(Video video, int id) {
        String title = video.getTitle().trim();
        if (!title.equals("")) {
            Video savedVideo = videoRepository.findOneById(id);
            savedVideo.setTitle(title);
            return(videoRepository.save(savedVideo));
        } else {
            return new Video(-1);
        }
    }

    public void deleteVideo(int id) {
        videoRepository.deleteById(id);
    }
}
