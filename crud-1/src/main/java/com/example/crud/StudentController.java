package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000") // อนุญาตการเข้าถึงจากที่อยู่ URL นี้
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmailService emailService;

    // 1. Create - เพิ่มข้อมูลนักศึกษาใหม่และส่งอีเมล
    @PostMapping("/add")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        // บันทึกข้อมูลนักศึกษาใหม่
        Student savedStudent = studentRepository.save(student);

        // ดึงอีเมลของนักศึกษาทั้งหมดเพื่อส่งอีเมล
        List<Student> students = studentRepository.findAll();
        List<String> emailAddresses = students.stream()
                .map(Student::getEmail)
                .collect(Collectors.toList());

        // หัวข้อและเนื้อหาของอีเมล
        String subject = "Announcement from University";
        String body = "Dear Student,\n\nThis is an important announcement.\n\nBest regards,\nUniversity Admin";

        // ส่งอีเมล
        emailService.sendEmails(emailAddresses, subject, body);

        // ส่งกลับ Response กับข้อมูลนักศึกษาที่ถูกบันทึก
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED); // ส่งกลับ 201 Created พร้อมข้อมูลนักศึกษา
    }

    // 2. Read All - อ่านข้อมูลนักศึกษาทั้งหมด
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK); // ส่งกลับ 200 OK พร้อมข้อมูลนักศึกษาทั้งหมด
    }

    // 5. Delete - ลบข้อมูลนักศึกษา
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // ส่งกลับ 204 No Content หลังลบสำเร็จ
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // ส่งกลับ 404 Not Found หากไม่พบ
        }
    }
}
