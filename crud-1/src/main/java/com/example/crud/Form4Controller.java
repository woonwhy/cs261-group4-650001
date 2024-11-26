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

@CrossOrigin(origins = "http://localhost:3000") // Allow access from this frontend URL
@RestController
@RequestMapping("/api/form4")
public class Form4Controller {

    @Autowired
    private Form4Repository form4Repository;

    @Autowired
    private EmailService emailService;

    // 1. Create - Add new data
    @PostMapping("/add")
    public ResponseEntity<Form4> createForm4(@RequestBody Form4 form4) {
        // Save the new form
        Form4 savedForm4 = form4Repository.save(form4);

        // Get the email of the newly added student
        String emailAddress = savedForm4.getEmail();

        // Subject and body of the email
        String subject = "คำร้องลาออกของคุณได้ถูกส่งไปแล้ว";
        String emailContent = emailService.generateEmailContent(savedForm4);

        // Send email to the student who submitted the form
        emailService.sendEmail(savedForm4.getEmail(), subject, emailContent);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedForm4);

    }

    // 2. Read All - Get all data
    @GetMapping
    public ResponseEntity<List<Form4>> getAllForm4() {
        List<Form4> form4List = form4Repository.findAll();
        return new ResponseEntity<>(form4List, HttpStatus.OK); // Return 200 OK with all data
    }

    // 3. Read By ID - Get data by ID
    @GetMapping("/{id}")
    public ResponseEntity<Form4> getForm4ById(@PathVariable Long id) {
        return form4Repository.findById(id)
                .map(form4 -> new ResponseEntity<>(form4, HttpStatus.OK)) // Return 200 OK with data
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Return 404 Not Found if not found
    }

    // 5. Delete - Delete data
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteForm4(@PathVariable Long id) {
        if (form4Repository.existsById(id)) {
            form4Repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 No Content after successful deletion
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 Not Found if not found
        }
    }
}
