package com.example.crud;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // อนุญาตการเข้าถึงจาก Frontend ที่ URL นี้
@RestController
@RequestMapping("/api/form1")
public class Form1Controller {

    @Autowired
    private Form1Repository form1Repository;

    @Autowired
    private EmailService emailService;

    // 1. Create - เพิ่มข้อมูลใหม่
    /*@PostMapping("/add")
    public ResponseEntity<Form1> createForm1(@RequestBody Form1 form1) {
        Form1 savedForm1 = form1Repository.save(form1);
        // ดึงอีเมลของนักศึกษาทั้งหมดเพื่อส่งอีเมล
        List<Form1> from1 = form1Repository.findAll();
        List<String> emailAddresses = form1.stream()
                .map(Form1::getEmail)
                .collect(Collectors.toList());

        // หัวข้อและเนื้อหาของอีเมล
        String subject = "คำร้องของคุณได้ถูกส่งไปแล้ว";
        String body = "Dear Student,\n\nคำร้องของนักศึกษาได้ถูกส่งให้อาจารย์ที่ปรึกษาเพื่อรอรับการอนุมัติต่อไปเรียบร้อบแล้ว\n\nBest regards,\nAdmin";

        // ส่งอีเมล
        emailService.sendEmails(emailAddresses, subject, body);

        return new ResponseEntity<>(savedForm1, HttpStatus.CREATED); // ส่งกลับ 201 Created พร้อมข้อมูล
    }*/
    @PostMapping("/add")
    public ResponseEntity<Form1> createForm1(@RequestBody Form1 form1) {
        // บันทึกคำร้องใหม่
        Form1 savedForm1 = form1Repository.save(form1);

        // ดึงอีเมลของนักศึกษาที่เพิ่งเพิ่ม
        String emailAddress = savedForm1.getEmail();

        // หัวข้อและเนื้อหาของอีเมล
        String subject = "คำร้องของคุณได้ถูกส่งไปแล้ว";
        /*String body = "Dear Student,\n\nคำร้องของนักศึกษาได้ถูกส่งให้อาจารย์ที่ปรึกษาเพื่อรอรับการอนุมัติต่อไปเรียบร้อบแล้ว\n\nBest regards,\nAdmin";*/
        String emailContent = emailService.generateEmailContent(savedForm1);

        // ส่งอีเมลถึงนักศึกษาคนที่เพิ่มคำร้อง
        /*emailService.sendEmail(emailAddress, subject, body);*/
        emailService.sendEmail(savedForm1.getEmail(), subject, emailContent);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedForm1);
    }


    // 2. Read All - อ่านข้อมูลทั้งหมด
    @GetMapping
    public ResponseEntity<List<Form1>> getAllForm1() {
        List<Form1> form1List = form1Repository.findAll();
        return new ResponseEntity<>(form1List, HttpStatus.OK); // ส่งกลับ 200 OK พร้อมข้อมูลทั้งหมด
    }

    // 3. Read By ID - อ่านข้อมูลเฉพาะ ID
    @GetMapping("/{id}")
    public ResponseEntity<Form1> getForm1ById(@PathVariable Long id) {
        return form1Repository.findById(id)
                .map(form1 -> new ResponseEntity<>(form1, HttpStatus.OK)) // ส่งกลับ 200 OK พร้อมข้อมูล
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // ส่งกลับ 404 Not Found หากไม่พบ
    }

    // 5. Delete - ลบข้อมูล
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteForm1(@PathVariable Long id) {
        if (form1Repository.existsById(id)) {
            form1Repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // ส่งกลับ 204 No Content หลังลบสำเร็จ
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // ส่งกลับ 404 Not Found หากไม่พบ
        }
    }
}
