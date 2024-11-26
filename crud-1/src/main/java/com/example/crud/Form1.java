package com.example.crud;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "form1")
public class Form1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "subject", nullable = false)
    private String subject;

    @Column(name = "section", nullable = false)
    private String section;

    @Column(name = "course", nullable = false)
    private String course;

    @Column(name = "semester", nullable = false)
    private String semester;
    @Column(name = "nameRequire", nullable = false)
    private String  nameRequire;
    @Column(name = "province", nullable = false)
    private String province;
    @Column(name = "district", nullable = false)
    private String district;
    @Column(name = "postal", nullable = false)
    private String postal;
    @Column(name = "home", nullable = false)
    private String home;

    @Column(name = "village", nullable = false)
    private String village;

    @Column(name = "tu_status", nullable = false)
    private String tu_status;
    @Column(name = "registrationDate", nullable = false)
    private String registrationDate;


    @Column(name = "username", nullable = false)
    private String  username;

    @Column(name = "name_th", nullable = false)
    private String name_th;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "faculty", nullable = false)
    private String faculty;

    @Column(name = "department", nullable = false)
    private String department;

    public String getEmail() {
        return email;
    }


    public String getNameTh() {
        return name_th;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public String getFaculty() {
        return faculty;
    }

    public String getDepartment() {
        return department;
    }

    public String getSubject() {
        return subject;
    }

    public String getReason() {
        return reason;
    }
}
