package com.galvanize.videocurator.repositories;

import com.galvanize.videocurator.models.Video;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VideoRepository extends CrudRepository<Video, Integer> {
    List<Video> findAllByOrderByIdAsc();
    Video findOneById(int id);
}
