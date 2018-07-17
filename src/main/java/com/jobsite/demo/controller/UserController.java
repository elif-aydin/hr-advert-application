package com.jobsite.demo.controller;

import com.jobsite.demo.db.AdvertRepository;
import com.jobsite.demo.db.ApplicationRepository;
import com.jobsite.demo.db.UserRepository;
import com.jobsite.demo.model.Advert;
import com.jobsite.demo.model.Application;
import com.jobsite.demo.model.User;
import com.jobsite.demo.model.UserExtended;
import com.jobsite.demo.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final AdvertRepository advertRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public UserController(UserRepository userRepository, AdvertRepository advertRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.advertRepository = advertRepository;
        this.applicationRepository = applicationRepository;
    }

    @RequestMapping(method=RequestMethod.POST, value="/public/checkAndSaveUser")
    public User save(@RequestBody User inputUser) {
        Optional<User> optionalUser = userRepository.findById(inputUser.getId());
        if (!optionalUser.isPresent()) {
            userRepository.save(inputUser);
        }
        return inputUser;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/getUserApplications")
    public List<Map<String, Object>> getApplications(@RequestBody String id) {
        List<Map<String, Object>> mapList = new ArrayList<>();
        if (id != null && !"".equals(id)) {
            id = id.substring(0, id.length() -1 );
            List<Application> applications = applicationRepository.findApplicationsByUserId(id);
            if (applications == null || applications.isEmpty())
                return mapList;
            else {
                for (Application application : applications) {
                    Map<String, Object> map = new HashMap<>();
                    map.put("applicationDate", application.getApplicationDate());
                    Advert advert = advertRepository.findById(application.getAdvertId()).get();
                    map.put("advertTitle", advert.getTitle());
                    map.put("advertCompany", advert.getFromCompany());
                    String status = "";
                    if (application.getStatus() == 0)
                        status = "Waiting";
                    else if (application.getStatus() == 1)
                        status = "In progress";
                    else if (application.getStatus() == 2)
                        status = "Accepted";
                    else if (application.getStatus() == 3)
                        status = "Rejected";
                    map.put("status", status);
                    mapList.add(map);
                }
                return mapList;
            }
        }
        return mapList;
    }

    @RequestMapping(value = "/public/applyToApplication/{advertId}&{userId}&{coverLetter}", method = RequestMethod.GET)
    public String applyToApplication(@PathVariable("advertId") String advertId, @PathVariable("userId") String userId,
                                      @PathVariable("coverLetter") String coverLetter) {
        Application dbApplication = applicationRepository.findApplicationByAdvertIdAndUserId(advertId, userId);
        if (dbApplication != null) {
            if (dbApplication.getStatus() == 3)
                return "You rejected by HR.";
            return "You already applied to this advert.";
        }

        Application application = new Application();
        application.setUserId(userId);
        application.setAdvertId(advertId);
        application.setCoverLetter(coverLetter);
        application.setStatus(0);
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        String d = formatter.format(new Date());
        application.setApplicationDate(d);

        applicationRepository.save(application);
        return "Your application created successfully.";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/userApplicationsHr")
    public List<Map<String, Object>> getUserAdvertsHr(@RequestBody Map<String, Object> data) {
        List<Map<String, Object>> output = new ArrayList<>();
        String userId = (String) data.get("userId");
        List<Application> applications = applicationRepository.findApplicationsByUserId(userId);
        if (applications == null || applications.isEmpty())
            return output;
        for (Application application : applications) {
            Advert advert = advertRepository.findById(application.getAdvertId()).get();
            Map<String, Object> map = new HashMap<>();
            map.put("advertTitle", advert.getTitle());
            map.put("advertCode", advert.getId());
            map.put("similarity", application.getSimilarity());
            map.put("applicationDate", application.getApplicationDate());

            String status = "";
            if (application.getStatus() == 0)
                status = "Waiting";
            else if (application.getStatus() == 1)
                status = "In progress";
            else if (application.getStatus() == 2)
                status = "Accepted";
            else if (application.getStatus() == 3)
                status = "Rejected";
            map.put("status", status);

            output.add(map);
        }
        return output;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/searchUserHr")
    public List<UserExtended> searchUsers(@RequestBody Map<String, Object> input) {
        String searchText = (String) input.get("searchText");
        List<UserExtended> output = new ArrayList<>();
        String[] arr = searchText.split(" ");
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
//        Query query = Query.query(Criteria.where("blackList").is(false)).addCriteria(TextCriteria.forDefaultLanguage().matching(searchText));
//        List<User> users = userRepository.findAllBy(query);
//        Query query = TextQuery.queryText(criteria).sortByScore();
//        query.addCriteria(Criteria.where("blackList").is(Boolean.FALSE));

        List<User> users = userRepository.findAllByOrderByScore(criteria);
        if (users == null || users.isEmpty())
            return output;
        users.forEach(user -> {output.add(new UserExtended(user, null));});
        return output;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/changeBlackListStatusHr")
    public UserExtended changeBlackListStatus(@RequestBody Map<String, Object> input) {
        String userId = (String) input.get("userId");
        String blackListReason = (String) input.get("blackListReason");
        Boolean blackListStatus = (Boolean) input.get("blackListStatus");
        User user = userRepository.findById(userId).get();
        user.setBlackList(blackListStatus);
        if (blackListStatus) {
            user.setBlackListReason(blackListReason);
            List<Application> applications = applicationRepository.findApplicationsByUserId(userId);
            if (applications != null) {
                for (Application application : applications) {
                    if (application.getStatus() != 3) {
                        application.setStatus(3);
                        applicationRepository.save(application);
                        Optional<Advert> advertOpt = advertRepository.findById(application.getAdvertId());
                        if (advertOpt.isPresent()) {
                            Advert advert = advertOpt.get();
                            Utils.sendEmail(user.getEmailAddress(), user.getFirstName() + ' ' + user.getLastName(), advert.getTitle(), 3);
                        }
                    }
                }
            }
        }

        else
            user.setBlackListReason("");
        userRepository.save(user);
        return new UserExtended(user, null);
    }
}
