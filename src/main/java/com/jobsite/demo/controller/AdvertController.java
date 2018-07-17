package com.jobsite.demo.controller;

import com.jobsite.demo.db.AdvertRepository;
import com.jobsite.demo.db.ApplicationRepository;
import com.jobsite.demo.db.UserRepository;
import com.jobsite.demo.model.*;
import com.jobsite.demo.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
public class AdvertController {

    private final AdvertRepository advertRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public AdvertController(AdvertRepository advertRepository, UserRepository userRepository, ApplicationRepository applicationRepository) {
        this.advertRepository = advertRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/public/advertsHrAll")
    public List<AdvertExtendedWithApplications> getAllAdverts() {
        List<Advert> list = advertRepository.findAll();
        List<AdvertExtendedWithApplications> newList = new ArrayList<>();
        for (Advert a : list) {
            newList.add(mapAdvertToExtended(a));
        }
        return newList;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/public/hrLogout")
    public void hrLogout(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        request.logout();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/public/advertsGeneral")
    public List<AdvertExtendedWithApplications> getGeneralAdverts() {
        List<Advert> list = advertRepository.findAdvertsByStatus(true);
        List<AdvertExtendedWithApplications> newList = new ArrayList<>();
        for (Advert a : list) {
            newList.add(mapAdvertToExtended(a));
        }
        return newList;
    }

    private AdvertExtendedWithApplications mapAdvertToExtended(Advert advert) {
        AdvertExtendedWithApplications aewa = new AdvertExtendedWithApplications(advert);
        List<Application> applications = applicationRepository.findApplicationsByAdvertIdOrderByAppDate(advert.getId());
        aewa.setApplications(applications);

        List<UserExtended> users = new ArrayList<>();
        applications.forEach(application -> {
            User user = userRepository.findById(application.getUserId()).get();
            users.add(new UserExtended(user, application));
        });

        aewa.setUsers(users);
        return aewa;
    }


    @RequestMapping(method = RequestMethod.GET, value = "/public/adverts/{advertId}")
    public Advert getAdvertById(@PathVariable("advertId") String advertId) {
        Advert advert = advertRepository.findById(advertId).get();
        return advert;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/public/advertsHr/{advertId}")
    public Map<String, Object> getAdvertByIdHr(@PathVariable("advertId") String advertId) {
        Advert advert = advertRepository.findById(advertId).get();
        List<User> applicants = new ArrayList<>();
        List<Application> applications = applicationRepository.findApplicationsByAdvertIdAndStatusNot(advertId, 3);
        if (applications != null && !applicants.isEmpty()) {
            List<String> applicantIds = new ArrayList<>();
            applications.forEach(application -> {
                applicantIds.add(application.getUserId());
            });

            userRepository.findAllById(applicantIds).forEach(applicants::add);
        }

        Map<String, Object> output = new HashMap<>();
        output.put("advert", advert);
        output.put("applicants", applicants);
        return output;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/createAdvert")
    public void createAdvert(@RequestBody AdvertInputModel advertInputModel) {
        Date now = new Date();
        Advert advert = new Advert();
        advert.setId(advertInputModel.getAdvertCode());
        advert.setCreateDate(now);
        advert.setDescription(advertInputModel.getDescription());
        advert.setFromCompany("OBSS");
        advert.setPlace("Ankara, Türkiye");
        advert.setRequirements(advertInputModel.getRequirements());
        advert.setTitle(advertInputModel.getAdvertTitle());
        advert.setStatus(false);
        if (now.after(advertInputModel.getActivationDate()) && now.before(advertInputModel.getDeactivationDate()))
            advert.setStatus(true);

        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        advert.setActivationDate(formatter.format(advertInputModel.getActivationDate()));
        advert.setDeactivationDate(formatter.format(advertInputModel.getDeactivationDate()));
        advert.setaDate(advertInputModel.getActivationDate());
        advert.setdDate(advertInputModel.getDeactivationDate());
        advertRepository.save(advert);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/setAdvertActiveHr")
    public Advert setActive(@RequestBody Map<String, Object> map) {
        String id = (String) map.get("advertId");
        Boolean active = (Boolean) map.get("active");
        Advert advert = advertRepository.findById(id).get();
        advert.setStatus(active);
        advertRepository.save(advert);
        return advert;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/changeApplicationStatusHr")
    public AdvertExtendedWithApplications changeApplicationStatus(@RequestBody Map<String, Object> map) {
        String advertId = (String) map.get("advertId");
        String userId = (String) map.get("userId");
        String advertTitle = (String) map.get("advertTitle");
        String userEmail = (String) map.get("userEmail");
        String userNameSurname = (String) map.get("userNameSurname");
        Integer status = (Integer) map.get("status");   // 1: in progress, 2: accept, 3: decline

        Application application = applicationRepository.findApplicationByAdvertIdAndUserId(advertId, userId);
        if (application != null) {
            application.setStatus(status);
            applicationRepository.save(application);
        }

        if (advertTitle != null && !"".equals(advertTitle) && userEmail != null && !"".equals(userEmail) && userNameSurname != null && !"".equals(userNameSurname)) {
            Utils.sendEmail(userEmail, userNameSurname, advertTitle, status);
        }
        return this.mapAdvertToExtended(advertRepository.findById(advertId).get());
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/searchAdverts")
    public List<Advert> searchUsers(@RequestBody Map<String, Object> input) {
        String searchText = (String) input.get("searchText");
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
        List<Advert> adverts = advertRepository.findAllByOrderByScore(criteria);
        if (adverts == null || adverts.isEmpty())
            return new ArrayList<>();
        return adverts;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/public/deleteAdvertHr")
    public void deleteAdvertHr(@RequestBody Map<String, Object> input) {
        String id = (String) input.get("advertId");
        advertRepository.deleteById(id);
    }

}
