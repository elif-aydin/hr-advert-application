package com.jobsite.demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AdvertExtendedWithApplications implements Serializable {
    private List<Application> applications = new ArrayList<>();
    private List<UserExtended> users = new ArrayList<>();
    private String id;
    private String title;
    private String description;
    private boolean status;
    private String fromCompany;
    private String place;
    private List<String> requirements = new ArrayList<>();
    private Date createDate;
    private Date aDate;
    private Date dDate;
    private String activationDate;
    private String deactivationDate;

    public AdvertExtendedWithApplications() {}

    public AdvertExtendedWithApplications(Advert advert) {
        this.setStatus(advert.getStatus());
        this.setActivationDate(advert.getActivationDate());
        this.setCreateDate(advert.getCreateDate());
        this.setDeactivationDate(advert.getDeactivationDate());
        this.setDescription(advert.getDescription());
        this.setFromCompany(advert.getFromCompany());
        this.setId(advert.getId());
        this.setPlace(advert.getPlace());
        this.setRequirements(advert.getRequirements());
        this.setTitle(advert.getTitle());
        this.setaDate(advert.getaDate());
        this.setdDate(advert.getdDate());
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    public List<UserExtended> getUsers() {
        return users;
    }

    public void setUsers(List<UserExtended> users) {
        this.users = users;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getFromCompany() {
        return fromCompany;
    }

    public void setFromCompany(String fromCompany) {
        this.fromCompany = fromCompany;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public List<String> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<String> requirements) {
        this.requirements = requirements;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getaDate() {
        return aDate;
    }

    public void setaDate(Date aDate) {
        this.aDate = aDate;
    }

    public Date getdDate() {
        return dDate;
    }

    public void setdDate(Date dDate) {
        this.dDate = dDate;
    }

    public String getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(String activationDate) {
        this.activationDate = activationDate;
    }

    public String getDeactivationDate() {
        return deactivationDate;
    }

    public void setDeactivationDate(String deactivationDate) {
        this.deactivationDate = deactivationDate;
    }
}
