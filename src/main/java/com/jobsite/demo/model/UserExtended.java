package com.jobsite.demo.model;

import org.springframework.data.mongodb.core.index.TextIndexed;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserExtended implements Serializable {
    private int a_status;
    private String a_statusText;
    private String a_coverLetter;
    private double a_similarity;
    private String a_applicationDate;
    private Date a_appDate;

    private String id;
    private String pictureUrl;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private Integer age;
    private Address address;
    private String industry;
    private String headline;
    private String summary;
    private String skills;
    private String honors;
    private String interests;
    private String keywords;
    private List<String> educations = new ArrayList<>();
    private List<String> experiences = new ArrayList<>();
    private boolean blackList;
    private String blackListReason;

    public UserExtended() {}

    public UserExtended(User user, Application application) {
        if (application != null) {
            this.a_similarity = application.getSimilarity();
            this.a_status = application.getStatus();
            this.a_coverLetter = application.getCoverLetter();
            this.a_applicationDate = application.getApplicationDate();
            this.a_appDate = application.getAppDate();
            if (a_status == 0)
                a_statusText = "Waiting";
            else if (a_status == 1)
                a_statusText = "In progress";
            else if (a_status == 2)
                a_statusText = "Accepted";
            else if (a_status == 3)
                a_statusText = "Rejected";
        }

        this.setId(user.getId());
        this.setPictureUrl(user.getPictureUrl());
        this.setFirstName(user.getFirstName());
        this.setLastName(user.getLastName());
        this.setEmailAddress(user.getEmailAddress());
        this.setAge(user.getAge());
        this.setAddress(user.getAddress());
        this.setIndustry(user.getIndustry());
        this.setHeadline(user.getHeadline());
        this.setSummary(user.getSummary());
        this.setSkills(user.getSkills());
        this.setInterests(user.getInterests());
        this.setBlackList(user.isBlackList());
        this.setBlackListReason(user.getBlackListReason());
        this.setKeywords(user.getKeywords());
    }

    public int getA_status() {
        return a_status;
    }

    public void setA_status(int a_status) {
        this.a_status = a_status;
    }

    public String getA_coverLetter() {
        return a_coverLetter;
    }

    public void setA_coverLetter(String a_coverLetter) {
        this.a_coverLetter = a_coverLetter;
    }

    public double getA_similarity() {
        return a_similarity;
    }

    public void setA_similarity(double a_similarity) {
        this.a_similarity = a_similarity;
    }

    public String getA_applicationDate() {
        return a_applicationDate;
    }

    public void setA_applicationDate(String a_applicationDate) {
        this.a_applicationDate = a_applicationDate;
    }

    public Date getA_appDate() {
        return a_appDate;
    }

    public void setA_appDate(Date a_appDate) {
        this.a_appDate = a_appDate;
    }

    public String getA_statusText() {
        return a_statusText;
    }

    public void setA_statusText(String a_statusText) {
        this.a_statusText = a_statusText;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getHonors() {
        return honors;
    }

    public void setHonors(String honors) {
        this.honors = honors;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public List<String> getEducations() {
        return educations;
    }

    public void setEducations(List<String> educations) {
        this.educations = educations;
    }

    public List<String> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<String> experiences) {
        this.experiences = experiences;
    }

    public boolean isBlackList() {
        return blackList;
    }

    public void setBlackList(boolean blackList) {
        this.blackList = blackList;
    }

    public String getBlackListReason() {
        return blackListReason;
    }

    public void setBlackListReason(String blackListReason) {
        this.blackListReason = blackListReason;
    }
}
