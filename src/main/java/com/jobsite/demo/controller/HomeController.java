package com.jobsite.demo.controller;

import com.jobsite.demo.db.UserRepository;
import com.jobsite.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

//@RestController
//public class HomeController {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    public HomeController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @RequestMapping(method = RequestMethod.GET, value = "/users")
//    public Iterable<User> getAll() {
//        Iterable<User> users = userRepository.findAll();
//        return users;
//    }
//
//    @RequestMapping(method = RequestMethod.POST, value = "/users")
//    public User saveUser(@RequestBody User user) {
//        userRepository.save(user);
//        return user;
//    }
//
//    @RequestMapping(method = RequestMethod.GET, value = "/users/{id}")
//    public User show(@PathVariable String id) {
//        Optional<User> userOptional = userRepository.findById(id);
//        return userOptional.get();
//    }
//
//    @RequestMapping(method = RequestMethod.PUT, value = "/users/{id}")
//    public User update(@PathVariable String id, @RequestBody User user) {
//        Optional<User> optionalUser = userRepository.findById(id);
//        User u = optionalUser.get();
//        if (user.getFirstName() != null)
//            u.setFirstName(user.getFirstName());
//        if (user.getLastName() != null)
//            u.setLastName(user.getLastName());
//        if (user.getAge() != null)
//            u.setAge(user.getAge());
//        if (user.getEmailAddress() != null)
//            u.setEmailAddress(user.getEmailAddress());
//
//        userRepository.save(u);
//        return u;
//    }
//
//    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
//    public String delete(@PathVariable String id) {
//        Optional<User> optionalUser = userRepository.findById(id);
//        User user = optionalUser.get();
//        userRepository.delete(user);
//        return "";
//    }
//}
