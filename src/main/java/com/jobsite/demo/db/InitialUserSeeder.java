package com.jobsite.demo.db;

import com.jobsite.demo.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class InitialUserSeeder implements CommandLineRunner
{
    private final UserRepository userRepository;
    private final AdvertRepository advertRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public InitialUserSeeder(UserRepository userRepository, AdvertRepository advertRepository, ApplicationRepository applicationRepository)
    {
        this.userRepository = userRepository;
        this.advertRepository = advertRepository;
        this.applicationRepository = applicationRepository;
    }


    @Override
    public void run(String... args) throws Exception
    {
        System.out.println("????!!!!!!");
        userRepository.deleteAll();
        advertRepository.deleteAll();
        applicationRepository.deleteAll();

        User user = new User();
        user.setId("A1");
        user.setFirstName("Ali");
        user.setLastName("Bey");
        user.setAge(12);
        user.setEmailAddress("asdd@asdasd.com");
        user.setAddress(new Address("TUrkey", "Ist"));
        user.setBlackList(false);
        user.setHeadline("headline");
        user.setSummary("summary");
        user.setSkills("skills");
        user.setInterests("interests");
        user.setIndustry("ind");
        user.setHonors("honors");
        userRepository.save(user);
        DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        String d = formatter.format(new Date());
        String de = "17/08/2018 01:45:30";
        Date created = new Date();
        String desc = "Türkiye çimento endüstrisinin kapasite ve pazar lideri OYAK Çimento, Beton, Kağıt Gurubu olarak, " +
                "Ulusal ve Uluslararası alanda, farklı branşlarda çalışmak isteyen, " +
                "Yeni Mezun, " +
                "İş hayatına atılmaya hazır, " +
                "Köklü bir kurumun parçası olmak isteyen, " +
                "Genç Yeteneklere iş hayatının kapılarını aralamaktayız.";

        List<String> requirements = Arrays.asList("Üniversitelerin Mühendislik (Tercihen Kimya, Makine, Elektrik Elektronik, Maden, Jeoloji ve Endüstri) ya da",
                "İktisadi İdari   Bilimler Fakültelerinden Mezun,",
                "İyi derecede İngilizce bilen,",
                "MS Office programlarına hakim,",
                "Analitik düşünce yapısına sahip, çözüm odaklı,",
                "Takım çalışmasına yatkın,",
                "Sözlü ve yazılı iletişim becerileri güçlü");

        String title = "New graduate Java developer";
        String fromCompany = "OBSS";
        String place = "Ankara, Türkiye";

        Advert advert = new Advert("ad1", title, desc, true, requirements, fromCompany, place, created, null, de);

        advertRepository.save(advert);

        Application application = new Application(user.getId(), advert.getId(), "cover", formatter.format(new Date()), 0, 1.1);

        applicationRepository.save(application);
    }
}
