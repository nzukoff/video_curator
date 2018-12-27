package com.galvanize.videocurator.services;

import com.galvanize.videocurator.models.Video;
import com.galvanize.videocurator.repositories.VideoRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
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
        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
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
        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);

        // Exercise
        Video returnedVideo = this.videoService.addVideo(video);

        // Assert
        verify(this.videoRepository).save(argThat(vid -> vid.getTitle().equals("Dean Town")));
        assertEquals(returnedVideo.getTitle(), video.getTitle());
    }

//    @Test
//    public void shouldCallYoutubeAPIWhenVideoAdded() throws Exception {
//        // Setup
//        MockRestServiceServer mockServer = MockRestServiceServer.createServer(videoService.getRestTemplate());
//        String key = "AIzaSyC6dS-h4pEP6P8FLmuNFs3NyDv7zqxTEEw";
//        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
//        String id = video.getYtID();
//        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);
//        mockServer
//                .expect(requestTo(String.format("https://www.googleapis.com/youtube/v3/videos?id=%s&part=contentDetails&key=%s", id, key)))
//                .andExpect(method(HttpMethod.GET))
//                .andRespond(withSuccess("{\n" +
//                        "    \"id\": 1,\n" +
//                        "    \"title\": \"Dean Town\",\n" +
//                        "    \"link\": \"https://www.youtube.com/watch?v=hAn-DWwHu6E\",\n" +
//                        "    \"ytID\": \"hAn-DWwHu6E\",\n" +
//                        "    \"duration\": \"PT5M57S\",\n" +
//                        "    \"dimension\": \"2d\",\n" +
//                        "    \"definition\": \"hd\",\n" +
//                        "    \"caption\": \"false\",\n" +
//                        "    \"licensedContent\": \"true\",\n" +
//                        "    \"projection\": \"rectangular\",\n" +
//                        "    \"created\": \"2018-12-24T20:08:35.965+0000\",\n" +
//                        "    \"modified\": \"2018-12-24T20:08:35.965+0000\"\n" +
//                        "}", MediaType.APPLICATION_JSON));
//
//
//        assertThat(this.videoService.addVideo(video).getTitle(), equalTo("FooBar"));
//        mockServer.verify();
//    }

    @Test
    public void shouldAddVideoBlankVideo() throws Exception {
        // Setup
        Video video = new Video("", "", "");
        Video expected = new Video(-1);

        // Exercise
        Video returnedVideo = this.videoService.addVideo(video);

        // Assert
        verify(this.videoRepository, never()).save(Mockito.any(Video.class));
        assertEquals(returnedVideo.getId(), expected.getId());
    }

//    @Test
//    public void shouldEditVideoValidVideo() throws Exception {
//        // Setup
//        Video origVideo = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
//        origVideo.setId(3);
//        Video video = new Video("Lethal Weapon");
//        video.setId(3);
//        when(this.videoRepository.findOneById(anyInt())).thenReturn(origVideo);
//        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);
//
//        // Exercise
//        Video returnedVideo = this.videoService.editVideo(video, 3);
//
//        // Assert
//        verify(this.videoRepository).findOneById(3);
//        verify(this.videoRepository).save(argThat(vid -> vid.getTitle().equals("Lethal Weapon")));
//        verify(this.videoRepository).save(argThat(vid -> vid.getId() == 3));
//        assertEquals(returnedVideo.getTitle(), video.getTitle());
//    }
//
//    @Test
//    public void shouldEditVideoBlankVideo() throws Exception {
//        // Setup
//        Video origVideo = new Video("");
//        origVideo.setId(3);
//        Video expected = new Video(-1);
//
//        // Exercise
//        Video returnedVideo = this.videoService.editVideo(origVideo, 3);
//
//        // Assert
//        verify(this.videoRepository, never()).findOneById(anyInt());
//        verify(this.videoRepository, never()).save(Mockito.any(Video.class));
//        assertEquals(returnedVideo.getId(), expected.getId());
//    }

    @Test
    public void shouldDeleteVideo() throws Exception {
        // Exercise
        this.videoService.deleteVideo(3);

        // Assert
        verify(this.videoRepository).deleteById(3);
    }

    @Test
    public void shouldIncreaseVideoVotes() throws Exception {
        // Setup
        Video origVideo = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        origVideo.setId(3);
        origVideo.setVotes(3);

        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        video.setId(3);
        origVideo.setVotes(4);

        when(this.videoRepository.findOneById(anyInt())).thenReturn(origVideo);
        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);

        // Exercise
        Video returnedVideo = this.videoService.increaseVotes(3);

        // Assert
        verify(this.videoRepository).findOneById(3);
        verify(this.videoRepository).save(argThat(vid -> vid.getId() == 3));
        assertEquals(returnedVideo.getVotes(), video.getVotes());
    }

    @Test
    public void shouldDecreaseVideoVotes() throws Exception {
        // Setup
        Video origVideo = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        origVideo.setId(3);
        origVideo.setVotes(3);

        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        video.setId(3);
        origVideo.setVotes(2);

        when(this.videoRepository.findOneById(anyInt())).thenReturn(origVideo);
        when(this.videoRepository.save(Mockito.any(Video.class))).thenReturn(video);

        // Exercise
        Video returnedVideo = this.videoService.decreaseVotes(3);

        // Assert
        verify(this.videoRepository).findOneById(3);
        verify(this.videoRepository).save(argThat(vid -> vid.getId() == 3));
        assertEquals(returnedVideo.getVotes(), video.getVotes());
    }
}