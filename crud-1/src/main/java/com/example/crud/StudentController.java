package com.example.crud;

import java.util.List;

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

@CrossOrigin(origins = "http://localhost:3000") // อนุญาตการเข้าถึงจากที่อยู่ URL นี้
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // 1. Create - เพิ่มข้อมูลนักศึกษาใหม่
    @PostMapping("/add")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student savedStudent = studentRepository.save(student);
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