package com.jobsite.demo.util;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class Utils {
    private static final String OBSS_MAIL = "fake.obss.hr@gmail.com";
    private static final String OBSS_MAIL_PASSWORD = "fakeobss1!";
    public static void sendEmail(String toMail, String toName, String advertTitle, int status) {
        String body = "Dear " + toName + "\n\n";
        if (status == 1) {
            body += "Your application is in progress.\n\nBest wishes.\nOBSS HR";
        }
        else if (status == 2) {
            body += "Your application is accepted. Congrats!\n\nBest wishes.\nOBSS HR";
        }
        else if (status == 3) {
            body += "Your application is rejected. Better luck next time!\n\nBest wishes.\nOBSS HR";
        }
        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(OBSS_MAIL, OBSS_MAIL_PASSWORD);
                    }
                });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(OBSS_MAIL));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail));
            message.setSubject("Status Update for " + advertTitle);
            message.setText(body);

            Transport.send(message);

            System.out.println("Email sent!");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
