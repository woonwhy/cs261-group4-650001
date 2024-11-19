package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

	@Autowired
	private StudentRepository StudentRepository;
	
	@GetMapping
	public List<Student> getAllUsers(){
		return StudentRepository.findAll();
	}
	
	@PostMapping
	public Student createUser(@RequestBody Student student) {
	    System.out.println("Received Student: " + student);
	    return StudentRepository.save(student);
	}

	 @GetMapping("/")
	    public String index() {
	        return "index"; // ชี้ไปยังไฟล์ index.html ใน resources/templates หรือ resources/static
	    }
	 @GetMapping("/test-connection")
	 public String testConnection() {
	     try {
	         StudentRepository.findAll();
	         return "Database connection is successful!";
	     } catch (Exception e) {
	         return "Database connection failed: " + e.getMessage();
	     }
	 }
}