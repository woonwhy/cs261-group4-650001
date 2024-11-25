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
<<<<<<< Updated upstream
	private Long id ; 
	
	@Column(name = "eng_name", nullable = false)
	private String eng_name ; 
	
	@Column(name = "email", nullable = false)
	private String email ; 
	
	@Column(name = "faculty", nullable = false)
	private String faculty ; 
	
	@Column(name = "type", nullable = false)
	private String type ; 
	
	@Column(name = "user_name", nullable = false)
	private String user_name ; 
	
}
=======
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
	
	@Column(name = "status", nullable = false)
	private String status ;
	
	@Column(name = "address", nullable = false)
	private String address ;
	
	@Column(name = "semester", nullable = false)
	private String semester ;
	
	@Column(name = "courseCode", nullable = false)
	private String courseCode ;
	
	@Column(name = "courseName", nullable = false)
	private String courseName ;
	
	@Column(name = "section", nullable = false)
	private String section ;
	
	@Column(name = "reason", nullable = false)
	private String reason ;

	public String getEmail() {
		return email;
	}

}
>>>>>>> Stashed changes
