package com.example.crud;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // คุณสามารถเพิ่มเมธอดค้นหาข้อมูลเพิ่มเติมได้ตามต้องการ
}