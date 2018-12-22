package com.galvanize.videocurator.services;

import com.galvanize.videocurator.models.Video;
import com.galvanize.videocurator.repositories.VideoRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
public class VideoServiceUT {

    @TestConfiguration
    static class VideoServiceTestConfiguration {
        @Bean
        public VideoService videoService() {
            return new VideoService();
        }
    }

    @Autowired
    private VideoService videoService;

    @MockBean
    private VideoRepository videoRepository;

    @Captor
    ArgumentCaptor argCaptor;

    @Test
    public void shouldGetVideos() throws Exception {
        // Setup
        Video video = new Video("The Matrix");
        List<Video> videoList = new ArrayList<>();
        videoList.add(video);
        when(this.videoRepository.findAllByOrderByIdAsc()).thenReturn(videoList);

        // Exercise
        List<Video> returnedVideos = this.videoService.getVideoList();

        // Assert
        assertEquals(returnedVideos, videoList);
    }

    @Test
    public void shouldAddVideoValidVideo() throws Exception {
        // Setup
        Video video = new Video("The Matrix");
        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);

        // Exercise
        Video returnedVideo = this.videoService.addVideo(video);

        // Assert
        verify(this.videoRepository).save(argThat(vid -> vid.getTitle().equals("The Matrix")));
        assertEquals(returnedVideo.getTitle(), video.getTitle());
    }

    @Test
    public void shouldAddVideoBlankVideo() throws Exception {
        // Setup
        Video video = new Video("");
        Video expected = new Video(-1);

        // Exercise
        Video returnedVideo = this.videoService.addVideo(video);

        // Assert
        verify(this.videoRepository, never()).save(Mockito.any(Video.class));
        assertEquals(returnedVideo.getId(), expected.getId());
    }

    @Test
    public void shouldEditVideoValidVideo() throws Exception {
        // Setup
        Video origVideo = new Video("Towering Inferno");
        origVideo.setId(3);
        Video video = new Video("Lethal Weapon");
        video.setId(3);
        when(this.videoRepository.findOneById(anyInt())).thenReturn(origVideo);
        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);

        // Exercise
        Video returnedVideo = this.videoService.editVideo(video, 3);

        // Assert
        verify(this.videoRepository).findOneById(3);
        verify(this.videoRepository).save(argThat(vid -> vid.getTitle().equals("Lethal Weapon")));
        verify(this.videoRepository).save(argThat(vid -> vid.getId() == 3));
        assertEquals(returnedVideo.getTitle(), video.getTitle());
    }

    @Test
    public void shouldEditVideoBlankVideo() throws Exception {
        // Setup
        Video origVideo = new Video("");
        origVideo.setId(3);
        Video expected = new Video(-1);

        // Exercise
        Video returnedVideo = this.videoService.editVideo(origVideo, 3);

        // Assert
        verify(this.videoRepository, never()).findOneById(anyInt());
        verify(this.videoRepository, never()).save(Mockito.any(Video.class));
        assertEquals(returnedVideo.getId(), expected.getId());
    }

    @Test
    public void shouldDeleteVideo() throws Exception {
        // Exercise
        this.videoService.deleteVideo(3);

        // Assert
        verify(this.videoRepository).deleteById(3);
    }
}