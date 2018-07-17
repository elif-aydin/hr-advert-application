package com.jobsite.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;

@Document(collection = "applications")
public class Application implements Serializable {
    @Id
    private String id;

    private String userId;
    private String advertId;
    private int status;
    private String coverLetter;
    private double similarity;
    private String applicationDate;
    private Date appDate;

    public Application() {

    }
    public Application(String userId, String advertId, String coverLetter, String applicationDate, int status, double similarity) {
        this.userId = userId;
        this.advertId = advertId;
        this.status = status;
        this.coverLetter = coverLetter;
        this.similarity = similarity;
        this.applicationDate = applicationDate;
    }
    @PersistenceConstructor
    public Application(String id, String userId, String advertId, int status, String coverLetter, double similarity, String applicationDate, Date appDate) {
        this.id = id;
        this.userId = userId;
        this.advertId = advertId;
        this.status = status;
        this.coverLetter = coverLetter;
        this.similarity = similarity;
        this.applicationDate = applicationDate;
        this.appDate = appDate;
    }

    public Application(String userId, String advertId, int status, String coverLetter, double similarity, String applicationDate) {
        this.userId = userId;
        this.advertId = advertId;
        this.status = status;
        this.coverLetter = coverLetter;
        this.similarity = similarity;
        this.applicationDate = applicationDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAdvertId() {
        return advertId;
    }

    public void setAdvertId(String advertId) {
        this.advertId = advertId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public double getSimilarity() {
        return similarity;
    }

    public void setSimilarity(double similarity) {
        this.similarity = similarity;
    }

    public String getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(String applicationDate) {
        this.applicationDate = applicationDate;
    }

    public Date getAppDate() {
        return appDate;
    }

    public void setAppDate(Date appDate) {
        this.appDate = appDate;
    }
}
