package com.example.newsgallery;

public class News {

    private final String mTitle;
    private final String mAuthor;
    private final String mUrl;
    private final String mImageUrl;

    public News(String title, String author, String url, String imageUrl) {
        this.mTitle = title;
        this.mAuthor = author;
        this.mUrl = url;
        this.mImageUrl =imageUrl;
    }

    public String getTitle() {
        return mTitle;
    }

    public String getAuthor() {
        return mAuthor;
    }

    public String getUrl() {
        return mUrl;
    }

    public String getImageUrl() {
        return mImageUrl;
    }
}
