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
@Table(name = "form4")
public class Form4 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   @Column(name = "registrationDate", nullable = false)
    private String registrationDate;

    @Column(name = "name_th", nullable = false)
    private String name_th;

    @Column(name = "username", nullable = false)
    private String  username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "faculty", nullable = false)
    private String faculty;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "tu_status", nullable = false)
    private String tu_status;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "semester", nullable = false)
    private String semester;
    @Column(name = "academic_year", nullable = false)
    private String academicYear;

   public String getEmail() {
        return email;
    }

    public String getNameTh() {
        return name_th;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public String getUsername() {
        return username;
    }

    public String getFaculty() {
        return faculty;
    }

    public String getReason() {
        return reason;
    }

    public String getSemester() {
        return semester;
    }

    public String getAcademicYear() {
        return academicYear;
    }
}
