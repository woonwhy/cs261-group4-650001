package com.example.crud;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Form1Repository extends JpaRepository<Form1, Long> {
    // คุณสามารถเพิ่มเมธอดค้นหาข้อมูลเพิ่มเติมได้ตามต้องการ
}