package com.jobsite.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "adverts")
public class Advert implements Serializable {

    @Id
    private String id;
    private @TextIndexed(weight = 3) String title;
    private @TextIndexed(weight = 2) String description;
    private boolean status;
    private @TextIndexed String fromCompany;
    private @TextIndexed String place;
//    private List<String> requirements;
    private @TextIndexed List<String> requirements = new ArrayList<>();
    private Date createDate;
    private Date aDate;
    private Date dDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
//    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private String activationDate;

    @DateTimeFormat(pattern = "MM/dd/yyyy")
//    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private String deactivationDate;
    @TextScore
    private Float score;

//    private List<String> applicantIds = new ArrayList<>();

    public Advert() {}

    @PersistenceConstructor
    public Advert(String id, String title, String description, boolean status, String fromCompany, String place, List<String> requirements, Date createDate, String activationDate, String deactivationDate, Date aDate, Date dDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.fromCompany = fromCompany;
        this.place = place;
        this.requirements = requirements;
        this.createDate = createDate;
        this.activationDate = activationDate;
        this.deactivationDate = deactivationDate;
        this.aDate = aDate;
        this.dDate = dDate;
    }

    public Advert(String title, String description, boolean status, List<String> requirements, String fromCompany, String place, Date createDate, String activationDate, String deactivationDate) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.requirements = requirements;
        this.createDate = createDate;
        this.activationDate = activationDate;
        this.deactivationDate = deactivationDate;
        this.fromCompany = fromCompany;
        this.place = place;

        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        try {
            this.aDate = formatter.parse(activationDate);
            this.dDate = formatter.parse(deactivationDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public Advert(String id, String title, String description, boolean status, List<String> requirements, String fromCompany, String place, Date createDate, String activationDate, String deactivationDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.requirements = requirements;
        this.createDate = createDate;
        this.activationDate = activationDate;
        this.deactivationDate = deactivationDate;
        this.fromCompany = fromCompany;
        this.place = place;
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        try {
            if (activationDate != null)
                this.aDate = formatter.parse(activationDate);
            if (deactivationDate != null)
                this.dDate = formatter.parse(deactivationDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
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

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Advert) {
            return this.getId().equals(((Advert) obj).getId());
        }

        return false;
    }
}
