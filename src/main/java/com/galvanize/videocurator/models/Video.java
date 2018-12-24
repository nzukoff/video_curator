package com.galvanize.videocurator.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "videos")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String link;
    private String ytID;
    private String duration;
    private String dimension;
    private String definition;
    private String caption;
    private String licensedContent;
    private String projection;

    @CreationTimestamp
    private Date created;

    @UpdateTimestamp
    private Date modified;

    public Video(String title, String link, String ytID, String duration, String dimension, String definition, String caption, String licensedContent, String projection) {
        this.title = title;
        this.link = link;
        this.ytID = ytID;
        this.duration = duration;
        this.dimension = dimension;
        this.definition = definition;
        this.caption = caption;
        this.licensedContent = licensedContent;
        this.projection = projection;
        this.id = 0;
    }

    public Video(int index) {
        this.title = "";
        this.id = index;
    }

    public Video(String title, String link, String ytID) {
        this.title = title;
        this.link = link;
        this.ytID = ytID;
    }

    public Video() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getYtID() {
        return ytID;
    }

    public void setYtID(String ytID) {
        this.ytID = ytID;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getLicensedContent() {
        return licensedContent;
    }

    public void setLicensedContent(String licensedContent) {
        this.licensedContent = licensedContent;
    }

    public String getProjection() {
        return projection;
    }

    public void setProjection(String projection) {
        this.projection = projection;
    }

    public Date getCreated() {
        return created;
    }
    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }
}

