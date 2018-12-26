package com.galvanize.videocurator.services;

import com.galvanize.videocurator.models.Video;
import com.galvanize.videocurator.repositories.VideoRepository;
import com.galvanize.videocurator.wrappers.YtResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }


    public List<Video> getVideoList() {
        return videoRepository.findAllByOrderByIdAsc();
    }

    public Video addVideo(Video video) {
        String title = video.getTitle().trim();
        if (!title.equals("")) {
            String id = video.getYtID();
            String key = "AIzaSyC6dS-h4pEP6P8FLmuNFs3NyDv7zqxTEEw";
            ResponseEntity<YtResponseWrapper> response = this.restTemplate.getForEntity(String.format("https://www.googleapis.com/youtube/v3/videos?id=%s&part=contentDetails&key=%s", id, key), YtResponseWrapper.class);
            String duration = response.getBody().getYtItems().get(0).getContentDetails().getDuration();
            String dimension = response.getBody().getYtItems().get(0).getContentDetails().getDimension();
            String definition = response.getBody().getYtItems().get(0).getContentDetails().getDefinition();
            String caption = response.getBody().getYtItems().get(0).getContentDetails().getCaption();
            String licensed_content = response.getBody().getYtItems().get(0).getContentDetails().getLicensedContent();
            String projection = response.getBody().getYtItems().get(0).getContentDetails().getProjection();
            String thumbnail = String.format("https://i.ytimg.com/vi/%s/sddefault.jpg", id);
            String embedLink = String.format("https://www.youtube.com/embed/%s", id);
            Video newVideo = new Video(title, video.getLink(), video.getYtID(), duration, dimension, definition, caption, licensed_content, projection, thumbnail, embedLink);
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
