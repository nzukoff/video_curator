package com.galvanize.worldsbestvideos.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.galvanize.worldsbestvideos.models.Video;
import com.galvanize.worldsbestvideos.repositories.VideoRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class VideoControllerIT {
    @Autowired
    MockMvc mvc;

    @Autowired
    VideoRepository videoRepository;

    private ObjectMapper mapper = new ObjectMapper();

    @Before
    public void before() {
        videoRepository.deleteAll();
    }

    @After
    public void after() {
        videoRepository.deleteAll();
    }

    @Test
    public void shouldGetVideos() throws Exception {
        // Setup
        Video video = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        videoRepository.save(video);
        String expected = video.getTitle();

        // Exercise
        String response = mvc.perform(get("/api/videos"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();


        // Assert
        assertNotEquals("should return video title", -1, response.indexOf(expected));
    }

    @Test
    public void shouldAddVideos() throws Exception {
        // Setup
        String newVideo = "{\"title\":\"Dean Town\",\"link\":\"https://www.youtube.com/watch?v=hAn-DWwHu6E\",\"ytID\":\"hAn-DWwHu6E\"}";
        Video expected = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");

        // Exercise
        String response = mvc.perform(post("/api/videos")
                .content(newVideo).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Assert
        List<Video> videos = videoRepository.findAllByOrderByIdAsc();
        assertEquals(1, videos.size());
        assertEquals(
                mapper.writeValueAsString(expected.getTitle()),
                mapper.writeValueAsString(videos.get(0).getTitle())
        );
    }

    @Test
    public void shouldUpvoteVideo() throws Exception {
        // Setup
//        String newVideo = "{\"title\":\"Dean Town\",\"link\":\"https://www.youtube.com/watch?v=hAn-DWwHu6E\",\"ytID\":\"hAn-DWwHu6E\"}";
        Video expected = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        videoRepository.save(expected);
        expected.setVotes(1);


        // Exercise
        String response = mvc.perform(put(String.format("/api/videos/%s/upvote", expected.getId()))
//                .content(newVideo)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Assert
        List<Video> videos = videoRepository.findAllByOrderByIdAsc();
        assertEquals(1, videos.size());
        assertEquals(
                mapper.writeValueAsString(expected.getVotes()),
                mapper.writeValueAsString(videos.get(0).getVotes())
        );
    }

    @Test
    public void shouldDownvoteVideo() throws Exception {
        // Setup
//        String newVideo = "{\"title\":\"Dean Town\",\"link\":\"https://www.youtube.com/watch?v=hAn-DWwHu6E\",\"ytID\":\"hAn-DWwHu6E\"}";
        Video expected = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        expected.setVotes(2);
        videoRepository.save(expected);
        expected.setVotes(1);


        // Exercise
        String response = mvc.perform(put(String.format("/api/videos/%s/downvote", expected.getId()))
//                .content(newVideo)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Assert
        List<Video> videos = videoRepository.findAllByOrderByIdAsc();
        assertEquals(1, videos.size());
        assertEquals(
                mapper.writeValueAsString(expected.getVotes()),
                mapper.writeValueAsString(videos.get(0).getVotes())
        );
    }

//    @Test
//    public void shouldEditVideos() throws Exception {
//        // Setup
//        videoRepository.deleteAll();
//        Video existingVideo = new Video("Scary Movie");
//        existingVideo = videoRepository.save(existingVideo);
//
//        String expected = "The Matrix";
//        String newVideo = "{\"id\": 1, \"title\": \"The Matrix\"}";
//
//        // Exercise
//        String response = mvc.perform(put("/api/videos/" + existingVideo.getId())
//                .content(newVideo).contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andReturn()
//                .getResponse()
//                .getContentAsString();
//
//        // Assert
//        List<Video> videos = videoRepository.findAllByOrderByIdAsc();
//        assertEquals(1, videos.size());
//        assertNotEquals(-1, response.indexOf(expected));
//    }

    @Test
    public void shouldDeleteVideos() throws Exception {
        // Setup
        videoRepository.deleteAll();
        Video existingVideo = new Video("Dean Town", "https://www.youtube.com/watch?v=hAn-DWwHu6E", "hAn-DWwHu6E");
        existingVideo = videoRepository.save(existingVideo);

        // Exercise
        String response = mvc.perform(delete("/api/videos/" + existingVideo.getId()))
                // .content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Assert
        List<Video> videos = videoRepository.findAllByOrderByIdAsc();
        assertEquals(0, videos.size());
    }
}
