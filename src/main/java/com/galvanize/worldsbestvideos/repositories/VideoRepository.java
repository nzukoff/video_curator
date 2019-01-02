package com.galvanize.worldsbestvideos.repositories;

import com.galvanize.worldsbestvideos.models.Video;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VideoRepository extends CrudRepository<Video, Integer> {
    List<Video> findAllByOrderByIdAsc();
    Video findOneById(int id);
}
