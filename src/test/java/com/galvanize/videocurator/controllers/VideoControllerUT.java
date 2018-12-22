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
        Video video = new Video("The Matrix");
        List<Video> expected = new ArrayList<>();
        expected.add(video);
        when(this.videoService.getVideoList()).thenReturn(expected);

        // Exercise
        this.mvc.perform(get("/api/videos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title", is("The Matrix")));
    }

    @Test
    public void shouldAddVideo() throws Exception {
        // Setup
        Video expected = new Video("The Matrix");
        when(this.videoService.addVideo(Mockito.any(Video.class))).thenReturn(expected);

        // Exercise
        this.mvc.perform(post("/api/videos")
                .content(mapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("The Matrix")));
    }

    @Test
    public void shouldEditVideo() throws Exception {
        // Setup
        Video expected = new Video("Lethal Weapon");
        expected.setId(3);
        when(this.videoService.editVideo(Mockito.any(Video.class), anyInt())).thenReturn(expected);

        // Exercise
        this.mvc.perform(put("/api/videos/3")
                .content(mapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Lethal Weapon")));
    }

    @Test
    public void shouldDeleteVideo() throws Exception {
        // Exercise
        this.mvc.perform(delete("/api/videos/3"))
                .andExpect(status().isOk());

        verify(this.videoService).deleteVideo(3);
    }
}

























