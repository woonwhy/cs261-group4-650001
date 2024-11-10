window.onload = function() {
    // ดึงข้อมูลผู้ใช้จาก Local Storage
    const form1 = JSON.parse(localStorage.getItem('form1'));

    if (form1) {
        // กำหนดค่าต่าง ๆ ในฟอร์ม
        document.getElementById('registrationDate').value = new Date().toLocaleDateString(); // วันที่จดทะเบียน (Auto fill)
        document.getElementById('displayname_th').value = form1.displayname_th;
        document.getElementById('username').value = form1.username;
        document.getElementById('email').value = form1.email;
        document.getElementById('faculty').value = form1.faculty;
        document.getElementById('department').value = form1.department;
        document.getElementById('tu_status').value = form1.tu_status;
    }

    // เพิ่ม Event Listener สำหรับการ submit form
    document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
        e.preventDefault(); // ป้องกันการ submit form แบบปกติ
        
        // เก็บข้อมูลจาก form
        const formData = {
            registrationDate: document.getElementById('registrationDate').value,
            displayname_th: document.getElementById('displayname_th').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            faculty: document.getElementById('faculty').value,
            department: document.getElementById('department').value,
            tu_status: document.getElementById('tu_status').value,
            address: document.getElementById('address').value,
            semester: document.getElementById('semester').value,
            courseCode: document.getElementById('courseCode').value,
            courseName: document.getElementById('courseName').value,
            section: document.getElementById('section').value,
            reason: document.getElementById('reason').value
        };

        // บันทึกข้อมูลลง localStorage (ถ้าต้องการ)
        localStorage.setItem('submittedForm', JSON.stringify(formData));
        
        // แสดง alert
        alert('บันทึกข้อมูลเรียบร้อย โปรดตรวจสอบสถานะได้ที่ สถานะคำร้อง');
        
        // redirect ไปยังหน้าหลักหลังจากกด OK ที่ alert
        //window.location.href = 'home.html';
    });
};

// ฟังก์ชันยกเลิกและกลับไปหน้าหลัก
function cancel() {
    window.location.href = 'home.html';
}
