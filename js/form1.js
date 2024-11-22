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

function saveStudentData(data) {
    fetch('http://localhost:8080/api/students/add', { // URL ต้องตรงกับ Spring Boot endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reason: data.reason,
            section: data.section,
            courseName: data.courseName,
            courseCode: data.courseCode,
            semester: data.semester,
            address: data.address,
            status: data.tu_status,
            department: data.department,
            faculty: data.faculty,
            email: data.email,
            userName: data.username,
            Name: data.displayname_th,
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