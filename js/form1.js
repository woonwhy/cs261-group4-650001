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

// สร้าง style สำหรับแสดงรายการไฟล์
const style = document.createElement('style');
style.textContent = `
.file-list {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin: 5px 0;
    background: #f5f5f5;
    border-radius: 4px;
}

.file-item button {
    background: #ff4444;
    color: white;
    border: none;
    padding: 2px 8px;
    border-radius: 3px;
    cursor: pointer;
}

.file-item button:hover {
    background: #cc0000;
}

.file-preview {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
}
`;
document.head.appendChild(style);

// สร้าง div สำหรับแสดงรายการไฟล์
const fileListDiv = document.createElement('div');
fileListDiv.className = 'file-list';
document.querySelector('.file-upload').appendChild(fileListDiv);

// ตัวแปรเก็บไฟล์ที่เลือก
let selectedFiles = [];

function validateFiles(files) {
    const maxFiles = 5;
    const maxSize = 100 * 1024; // 100kB in bytes
    const allowedTypes = ['application/pdf', 'image/jpeg'];
    const result = {
        isValid: true,
        errors: []
    };

    // ตรวจสอบจำนวนไฟล์รวม
    if (selectedFiles.length + files.length > maxFiles) {
        result.errors.push(`สามารถอัพโหลดได้สูงสุด ${maxFiles} ไฟล์เท่านั้น`);
        result.isValid = false;
        return result;
    }

    // ตรวจสอบแต่ละไฟล์
    Array.from(files).forEach(file => {
        // ตรวจสอบประเภทไฟล์
        if (!allowedTypes.includes(file.type)) {
            result.errors.push(`ไฟล์ ${file.name} ไม่ใช่ไฟล์ประเภท PDF หรือ JPG`);
            result.isValid = false;
        }

        // ตรวจสอบขนาดไฟล์
        if (file.size > maxSize) {
            result.errors.push(`ไฟล์ ${file.name} มีขนาดเกิน 100kB`);
            result.isValid = false;
        }
    });

    return result;
}

function updateFileList() {
    fileListDiv.innerHTML = '';
    
    if (selectedFiles.length === 0) {
        fileListDiv.style.display = 'none';
        return;
    }
    
    fileListDiv.style.display = 'block';
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        // สร้าง preview สำหรับรูปภาพ
        let fileContent = '';
        if (file.type === 'image/jpeg') {
            const img = document.createElement('img');
            img.className = 'file-preview';
            img.src = URL.createObjectURL(file);
            fileContent = img.outerHTML;
        } else {
            fileContent = '<span style="width: 50px;">📄</span>';
        }
        
        fileItem.innerHTML = `
            ${fileContent}
            <span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
            <button onclick="removeFile(${index})">ลบ</button>
        `;
        fileListDiv.appendChild(fileItem);
    });

    // อัพเดทข้อความแสดงจำนวนไฟล์
    document.querySelector('.file-info').textContent = 
        `เลือกไฟล์แล้ว ${selectedFiles.length}/5 ไฟล์ (รองรับ pdf,jpg ขนาดไม่เกิน 100kB)`;
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFileList();
}

// เพิ่ม event listener สำหรับ input file
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
    const validationResult = validateFiles(e.target.files);
    
    if (!validationResult.isValid) {
        alert(validationResult.errors.join('\n'));
        this.value = '';
    } else {
        // เพิ่มไฟล์ใหม่เข้าไปใน array
        Array.from(e.target.files).forEach(file => {
            selectedFiles.push(file);
        });
        updateFileList();
    }
    
    // รีเซ็ต input เพื่อให้สามารถเลือกไฟล์เดิมซ้ำได้
    this.value = '';
});


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
