package com.galvanize.videocurator.wrappers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class YtItemsWrapper {

    @JsonProperty("contentDetails")
    private ContentDetailsWrapper contentDetails;

    public ContentDetailsWrapper getContentDetails() {
        return contentDetails;
    }

    public void setContentDetails(ContentDetailsWrapper contentDetails) {
        this.contentDetails = contentDetails;
    }
}
