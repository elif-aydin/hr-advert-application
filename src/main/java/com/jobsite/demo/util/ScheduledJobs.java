package com.jobsite.demo.util;

import com.jobsite.demo.db.AdvertRepository;
import com.jobsite.demo.model.Advert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ScheduledJobs {

    private final AdvertRepository advertRepository;

    @Autowired
    public ScheduledJobs(AdvertRepository advertRepository) {
        this.advertRepository = advertRepository;
    }

    @Scheduled(cron = "5 */1 * * * *")
    public void setAdvertStatuses() {
        Date date = new Date();
        for (Advert advert : advertRepository.findAll()) {
            boolean change = false;
            if (advert.getaDate() != null && advert.getaDate().before(date)) {
                advert.setStatus(true);
                change = true;
            }
            if (advert.getdDate() != null && advert.getdDate().before(date)) {
                advert.setStatus(false);
                change = true;
            }
            if (change) {
                advertRepository.save(advert);
            }
        }
    }
}
