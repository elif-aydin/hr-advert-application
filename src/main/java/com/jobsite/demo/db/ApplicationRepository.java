package com.jobsite.demo.db;

import com.jobsite.demo.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findApplicationsByAdvertId(String advertId);

    List<Application> findApplicationsByAdvertIdOrderByAppDate(String advertId);

    List<Application> findApplicationsByUserId(String userId);

    List<Application> findApplicationsByStatusOrderByApplicationDate(Integer status);

    List<Application> findApplicationsByAdvertIdAndStatusNot(String advertId, Integer status);

    Application findApplicationByAdvertIdAndUserId(String advertId, String userId);

}
