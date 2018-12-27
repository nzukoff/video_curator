package com.galvanize.videocurator.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.galvanize.videocurator.models.Video;
import com.galvanize.videocurator.repositories.VideoRepository;
import com.galvanize.videocurator.services.VideoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(VideoController.class)
public class VideoControllerUT {
    @Autowired
    MockMvc mvc;

    @MockBean
    private VideoService videoService;

    @MockBean
    private VideoRepository videoRepository;

    private ObjectMapper mapper = new ObjectMapper();

    @Test
    public void shouldGetVideos() throws Exception {
        // Setup
        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        List<Video> expected = new ArrayList<>();
        expected.add(video);
        when(this.videoService.getVideoList()).thenReturn(expected);

        // Exercise
        this.mvc.perform(get("/api/videos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is("Dean Town")));
    }

    @Test
    public void shouldAddVideo() throws Exception {
        // Setup
        Video expected = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        when(this.videoService.addVideo(Mockito.any(Video.class))).thenReturn(expected);

        // Exercise
        this.mvc.perform(post("/api/videos")
                .content(mapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Dean Town")));
    }

    @Test
    public void shouldIncreaseVotes() throws Exception {
        // Exercise
        this.mvc.perform(put("/api/videos/1/upvote")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(this.videoService, times(1)).increaseVotes(anyInt());
    }

    @Test
    public void shouldDecreaseVotes() throws Exception {
        // Exercise
        this.mvc.perform(put("/api/videos/1/downvote")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(this.videoService, times(1)).decreaseVotes(anyInt());
    }

//    @Test
//    public void shouldEditVideo() throws Exception {
//        // Setup
//        Video expected = new Video("Lethal Weapon");
//        expected.setId(3);
//        when(this.videoService.editVideo(Mockito.any(Video.class), anyInt())).thenReturn(expected);
//
//        // Exercise
//        this.mvc.perform(put("/api/videos/3")
//                .content(mapper.writeValueAsString(expected))
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.title", is("Lethal Weapon")));
//    }

    @Test
    public void shouldDeleteVideo() throws Exception {
        // Exercise
        this.mvc.perform(delete("/api/videos/3"))
                .andExpect(status().isOk());

        verify(this.videoService).deleteVideo(3);
    }
}

























