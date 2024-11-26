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
@Table(name = "students")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "registrationDate", nullable = false)
	private String registrationDate;

	@Column(name = "displayname_th", nullable = false)
	private String displayname_th;

	@Column(name = "username", nullable = false)
	private String username;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "faculty", nullable = false)
	private String faculty;

	@Column(name = "department", nullable = false)
	private String department;

	@Column(name = "tu_status", nullable = false)
	private String tu_status;

	@Column(name = "Hnum", nullable = false)
	private String Hnum;

	@Column(name = "village", nullable = false)
	private String village;

	@Column(name = "province", nullable = false)
	private String province;

	@Column(name = "district", nullable = false)
	private String district;

	@Column(name = "postal", nullable = false)
	private String postal;

	@Column(name = "name_require", nullable = false)
	private String name_require;

	@Column(name = "semester", nullable = false)
	private String semester;

	@Column(name = "course", nullable = false)
	private String course;

	@Column(name = "subject", nullable = false)
	private String subject;

	@Column(name = "section", nullable = false)
	private String section;

	@Column(name = "reason", nullable = false)
	private String reason;

	public String getEmail() {
		return email;
	}

}
