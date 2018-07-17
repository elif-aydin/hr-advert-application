package com.jobsite.demo.db;

import com.jobsite.demo.model.User;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAll();
    List<User> findByFirstName(String firstName);
    List<User> findAllByOrderByScore(Query query);
    List<User> findAllBy(TextCriteria criteria);
    List<User> findAllByOrderByScore(TextCriteria criteria);
    List<User> findAllBy(Query query);
}
