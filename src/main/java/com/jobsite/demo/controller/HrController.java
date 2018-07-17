package com.jobsite.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Properties;

@RestController
public class HrController {
    @RequestMapping(value = "/hr/login")
    public RedirectView login() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000/accessGranted");
        Properties properties = new Properties();
        properties.put("hrLogin", true);
        redirectView.setAttributes(properties);
        return redirectView;
    }
}
