package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /*public void sendEmails(List<String> emailAddresses, String subject, String body) {
        for (String email : emailAddresses) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        }
    }*/

    public void sendEmail(String emailAddress, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailAddress);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    // สร้างข้อความอีเมลจากข้อมูลแบบฟอร์ม
    public String generateEmailContent(Form1 form1) {
        return "เรียน " + form1.getNameTh() + ",\n\n" +
                "รายละเอียดคำร้องของคุณ:\n" +
                "วันที่ลงทะเบียน: " + form1.getRegistrationDate() + "\n" +
                "คณะ: " + form1.getFaculty() + "\n" +
                "ภาควิชา: " + form1.getDepartment() + "\n" +
                "รหัสวิชา: " + form1.getSubject() + "\n" +
                "เหตุผล: " + form1.getReason() + "\n\n" +
                "คำร้องของคุณได้ถูกส่งไปยังอาจารย์ที่ปรึกษาแล้ว กรุณารอการอนุมัติ\n\n" +
                "ขอแสดงความนับถือ,\nทีมงาน";
    }
 public String generateEmailContent(Form4 form4) {
        return "เรียน " + form4.getNameTh() + ",\n\n" +
                "รายละเอียดคำร้องของคุณ:\n" +
                "วันที่ลงทะเบียน: " + form4.getRegistrationDate() + "\n" +
                "ชื่อ: " + form4.getNameTh() + "\n" +
                "ชื่อผู้ใช้: " + form4.getUsername() + "\n" +
                "คณะ: " + form4.getFaculty() + "\n" +
                "เหตุผล: " + form4.getReason() + "\n" +
                "ภาคการศึกษา: " + form4.getSemester() + "\n" +
                "ปีการศึกษา: " + form4.getAcademicYear() + "\n\n" +
                "คำร้องลาออกของคุณได้ถูกส่งไปยังอาจารย์ที่ปรึกษาแล้ว กรุณารอการอนุมัติ\n\n" +
                "ขอแสดงความนับถือ,\nทีมงาน";
    }
}


