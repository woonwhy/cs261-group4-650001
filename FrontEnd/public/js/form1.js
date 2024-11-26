window.onload = function () {
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
    document.querySelector('button[type="submit"]').addEventListener('click', function (e) {
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
            Hnum: document.getElementById('Hnum').value,
            village: document.getElementById('village').value,
            province: document.getElementById('province').value,
            district: document.getElementById('district').value,
            postal: document.getElementById('postal').value,
            name_require: document.getElementById('name_require').value,
            semester: document.getElementById('semester').value,
            course: document.getElementById('course').value,
            subject: document.getElementById('subject').value,
            section: document.getElementById('section').value,
            reason: document.getElementById('reason').value,
            file: document.getElementById('file').value,
        };

        // บันทึกข้อมูล
        saveStudentData(formData);

        // แสดง popup เมื่อบันทึกข้อมูลเสร็จ
        showSuccessPopup();
    });

    // เพิ่ม Event Listener สำหรับปุ่ม OK ใน popup
    const okButton = document.getElementById('okButton');
    if (okButton) {
        okButton.addEventListener('click', function () {
            hidePopup();
            window.location.href = 'status.html'; // ไปยังหน้า status หลังจากคลิก OK
        });
    }

    // เพิ่ม Event Listener สำหรับปุ่มกากบาท (X) เพื่อปิด popup และอยู่หน้าเดิม
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            hidePopup(); // ปิด popup โดยไม่เปลี่ยนหน้า
        });
    }
};
function cancel() {
    window.location.href = "home.html";
}
// ฟังก์ชันแสดง popup
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'flex'; // แสดง popup
    } else {
        console.error('ไม่พบ Element successPopup');
    }
}

// ฟังก์ชันซ่อน popup
function hidePopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'none'; // ซ่อน popup
    } else {
        console.error('ไม่พบ Element successPopup');
    }
}

// ฟังก์ชันสำหรับบันทึกข้อมูล
function saveStudentData(data) {
    return fetch('http://localhost:8080/api/students/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            file_path: data.file,
            reason: data.reason,
            section: data.section,
            subject: data.subject,
            course: data.course,
            semester: data.semester,
            name_require: data.name_require,
            postal: data.postal,
            district: data.district,
            province: data.province,
            village: data.village,
            housenumber: data.Hnum,
            status: data.tu_status,
            department: data.department,
            faculty: data.faculty,
            email: data.email,
            userName: data.username,
            displayname_th: data.displayname_th,
            date: data.registrationDate
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save data');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
