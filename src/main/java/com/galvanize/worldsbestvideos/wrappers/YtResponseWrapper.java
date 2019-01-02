package com.galvanize.worldsbestvideos.wrappers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class YtResponseWrapper {

    @JsonProperty("items")
    private ArrayList<YtItemsWrapper> YtItems;

    public ArrayList<YtItemsWrapper> getYtItems() {
        return YtItems;
    }

    public void setYtItems(ArrayList<YtItemsWrapper> ytItems) {
        YtItems = ytItems;
    }
}
