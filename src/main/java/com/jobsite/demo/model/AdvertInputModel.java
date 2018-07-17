package com.jobsite.demo.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class AdvertInputModel implements Serializable {
    private String advertCode;
    private String advertTitle;
    private String description;
    private List<String> requirements;
    private Date activationDate;
    private Date deactivationDate;

    public String getAdvertCode() {
        return advertCode;
    }

    public void setAdvertCode(String advertCode) {
        this.advertCode = advertCode;
    }

    public String getAdvertTitle() {
        return advertTitle;
    }

    public void setAdvertTitle(String advertTitle) {
        this.advertTitle = advertTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getRequirements() {
        return requirements;
    }

    public void setRequirements(List<String> requirements) {
        this.requirements = requirements;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(Date activationDate) {
        this.activationDate = activationDate;
    }

    public Date getDeactivationDate() {
        return deactivationDate;
    }

    public void setDeactivationDate(Date deactivationDate) {
        this.deactivationDate = deactivationDate;
    }
}
