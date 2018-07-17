package com.jobsite.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User implements Serializable {
    @Id
    private String id;
    private String pictureUrl;
    private @TextIndexed String firstName;
    private @TextIndexed String lastName;
    private String emailAddress;
    private Integer age;
    private @TextIndexed Address address;
    private @TextIndexed(weight = 3) String industry;
    private @TextIndexed(weight = 2) String headline;
    private @TextIndexed String summary;
    private @TextIndexed(weight = 3) String skills;
    private @TextIndexed(weight = 3) String honors;
    private @TextIndexed String interests;
    private @TextIndexed String keywords;
    private @TextIndexed List<String> educations = new ArrayList<>();
    private @TextIndexed(weight = 2) List<String> experiences = new ArrayList<>();
    private boolean blackList;
    private String blackListReason;

    @TextScore private Float score;

    public User() {

    }

    @PersistenceConstructor
    public User(String id, String firstName, String lastName, String emailAddress, Integer age, Address address, String industry, String headline, String summary, String skills, String honors, String interests, boolean blackList, String blackListReason, String keywords, List<String> educations, List<String> experiences, String pictureUrl) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.age = age;
        this.address = address;
        this.industry = industry;
        this.headline = headline;
        this.summary = summary;
        this.skills = skills;
        this.honors = honors;
        this.interests = interests;
        this.blackList = blackList;
        this.blackListReason = blackListReason;
        this.keywords = keywords;
        this.educations = educations;
        this.experiences = experiences;
        this.pictureUrl = pictureUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
}
