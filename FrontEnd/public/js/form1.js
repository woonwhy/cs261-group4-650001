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

        // เก็บข้อมูลจาก form (โค้ดนี้จะไม่เปลี่ยนแปลง)
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

        // บันทึกข้อมูล (ใช้คำสั่งนี้ในส่วน saveStudentData)
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

    // เพิ่ม Event Listener สำหรับปุ่มกากบาท (X) เพื่อปิด popup
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', hidePopup);
    }
};

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

// เพิ่ม Event Listener สำหรับปุ่มกากบาท (X) เพื่อปิด popup
const closeButton = document.querySelector('.close-btn');
if (closeButton) {
    closeButton.addEventListener('click', hidePopup);
}


// ฟังก์ชันสำหรับบันทึกข้อมูล (ปรับเป็นใช้ Promise เพื่อให้รองรับ .then/.catch)
function saveStudentData(data) {
    return fetch('http://localhost:8080/api/students/add', { // URL ต้องตรงกับ Spring Boot endpoint
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
    });
}


// ฟังก์ชันสำหรับบันทึกข้อมูล (ปรับเป็นใช้ Promise เพื่อให้รองรับ .then/.catch)
function saveStudentData(data) {
    return fetch('http://localhost:8080/api/students/add', { // URL ต้องตรงกับ Spring Boot endpoint
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
    });
}


// ฟังก์ชันยกเลิกและกลับไปหน้าหลัก
function cancel() {
    window.location.href = 'home.html';
}

function saveStudentData(data) {
    fetch('http://localhost:8080/api/students/add', { // URL ต้องตรงกับ Spring Boot endpoint
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
    .then(data => {
        console.log('Data saved successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

// เก็บไฟล์ที่อัพโหลดไว้
let uploadedFiles = [];

function handleFileUpload(event) {
    const files = event.target.files;
    const maxFiles = 5;
    const maxSize = 100 * 1024; // 100kB in bytes
    const allowedTypes = ['application/pdf', 'image/jpeg'];
    
    // ตรวจสอบจำนวนไฟล์ทั้งหมด
    if (uploadedFiles.length + files.length > maxFiles) {
        alert(`สามารถอัพโหลดได้สูงสุด ${maxFiles} ไฟล์เท่านั้น`);
        event.target.value = '';
        return;
    }

    // ตรวจสอบแต่ละไฟล์
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // ตรวจสอบประเภทไฟล์
        if (!allowedTypes.includes(file.type)) {
            alert(`ไฟล์ ${file.name} ต้องเป็นไฟล์ PDF หรือ JPG เท่านั้น`);
            event.target.value = '';
            return;
        }
        
        // ตรวจสอบขนาดไฟล์
        if (file.size > maxSize) {
            alert(`ไฟล์ ${file.name} มีขนาดเกิน 100kB`);
            event.target.value = '';
            return;
        }
        
        // เพิ่มไฟล์ที่ผ่านการตรวจสอบ
        uploadedFiles.push(file);
    }

    // แสดงรายการไฟล์ที่อัพโหลด
    displayUploadedFiles();
}

function displayUploadedFiles() {
    // สร้าง element สำหรับแสดงรายการไฟล์
    const fileList = document.createElement('div');
    fileList.id = 'fileList';
    
    uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        // แสดงชื่อไฟล์และปุ่มลบ
        fileItem.innerHTML = `
            <span>${file.name} (${(file.size / 1024).toFixed(1)} kB)</span>
            <button type="button" onclick="removeFile(${index})">ลบ</button>
        `;
        
        fileList.appendChild(fileItem);
    });

    // อัพเดทการแสดงผลในหน้าเว็บ
    const existingFileList = document.getElementById('fileList');
    if (existingFileList) {
        existingFileList.replaceWith(fileList);
    } else {
        document.querySelector('.file-upload').appendChild(fileList);
    }
}

function removeFile(index) {
    // ลบไฟล์ออกจาก array
    uploadedFiles.splice(index, 1);
    // อัพเดทการแสดงผล
    displayUploadedFiles();
}

// เพิ่ม event listener สำหรับ input file
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file');
    fileInput.addEventListener('change', handleFileUpload);
});