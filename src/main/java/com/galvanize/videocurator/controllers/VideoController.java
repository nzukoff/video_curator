package com.galvanize.videocurator.controllers;

import com.galvanize.videocurator.models.Video;
import com.galvanize.videocurator.repositories.VideoRepository;
import com.galvanize.videocurator.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
class VideoController {

    @Autowired
    VideoRepository repository;

    @Autowired
    VideoService videoService;

    @GetMapping("/api/videos")
    public List<Video> getVideoList() {
        return videoService.getVideoList();
    }

    @PostMapping("/api/videos")
    public Video addVideo(@RequestBody Video video) {
        return videoService.addVideo(video);
    }

    @PutMapping("/api/videos/{id}")
    public Video editVideo(@RequestBody Video video, @PathVariable int id) {
        return videoService.editVideo(video, id);
    }

    @DeleteMapping("/api/videos/{id}")
    public void deleteVideo(@PathVariable int id) {
        videoService.deleteVideo(id);
    }
}
