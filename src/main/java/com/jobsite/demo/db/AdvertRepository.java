package com.jobsite.demo.db;

import com.jobsite.demo.model.Advert;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AdvertRepository extends MongoRepository<Advert, String> {

    List<Advert> findAdvertsByStatus(boolean status);

    List<Advert> findAdvertsByStatusIsNot(boolean status);

    List<Advert> findAllByOrderByScore(TextCriteria criteria);

}
