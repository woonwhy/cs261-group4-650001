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
@Table(name="students")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	@Column(name = "date", nullable = false)
	private String date ;
	
	@Column(name = "thai_name", nullable = false)
	private String displayname_th ;
	
	@Column(name = "user_name", nullable = false)
	private String userName ; 
	
	@Column(name = "email", nullable = false)
	private String email ;
	
	@Column(name = "faculty", nullable = false)
	private String faculty ;
	
	@Column(name = "department", nullable = false)
	private String department ;
	
	@Column(name = "status", nullable = false)
	private String status ;
	
	@Column(name = "housenumber")
	private String housenumber ;
	
	@Column(name = "village")
	private String village ;
	
	@Column(name = "province")
	private String province ;
	
	@Column(name = "district")
	private String district ;
	
	@Column(name = "postal")
	private String postal ;
	
	@Column(name = "name_require")
	private String name_require ;
	
	@Column(name = "semester", nullable = false)
	private String semester ;
	
	@Column(name = "course_code")
	private String course ;
	
	@Column(name = "subject")
	private String subject ;
	
	@Column(name = "section")
	private String section ;
	
	@Column(name = "reason", nullable = false)
	private String reason ;
	
	@Column(name = "file_path", nullable = false)
	private String file_path ;
	
	@Column(name = "year")
	private String year ;
	
	@Column(name = "debt")
	private String debt ;
	

}
