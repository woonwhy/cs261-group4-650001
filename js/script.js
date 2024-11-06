// กำหนด error messages
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: { 
        th: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 
        en: 'Invalid username or password.' 
    },
    EMPTY_FIELDS: { 
        th: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 
        en: 'Please enter both username and password.' 
    }
};

// function สำหรับแสดงข้อความ error ทั้งสองภาษา
function showError(errorType) {
    const errorElement = document.getElementById('message');
    const thMessage = ERROR_MESSAGES[errorType].th;
    const enMessage = ERROR_MESSAGES[errorType].en;
    
    // สร้าง error message ในรูปแบบ "ข้อความภาษาไทย (English message)"
    errorElement.innerText = `${thMessage} (${enMessage})`;
    errorElement.style.color = 'red';
    errorElement.style.display = 'block';
}

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   const role = document.getElementById('role').value;
    // ตรวจสอบข้อมูลว่าง
    if (!username || !password) {
        showError('EMPTY_FIELDS');
        return;
    }

    // เก็บข้อมูลใน sessionStorage ถ้าต้องการจดจำผู้ใช้
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('role', role);

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU7a8369b69d9fe193235104bd66ad2091f212044bd3ad78226274784ab2c0bac00bc0d2e5e30ff74abfb456f8ef087695'
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('INVALID_CREDENTIALS');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').innerText = data.message;
        document.getElementById('status').innerText = data.status; 
        document.getElementById('type').innerText = data.type;
        document.getElementById('username').innerText = data.username;
        document.getElementById('tu_status').innerText = data.tu_status;
        document.getElementById('statusid').innerText = data.statusid;
        document.getElementById('displayname_th').innerText = data.displayname_th;
        document.getElementById('displayname_en').innerText = data.displayname_en;
        document.getElementById('email').innerText = data.email;
        document.getElementById('department').innerText = data.department;
        document.getElementById('faculty').innerText = data.faculty;

        if (data.status === true) {
            const messageElement = document.getElementById('message');
            messageElement.innerText = 'Login Success!'; // ข้อความแจ้งเตือน
            messageElement.style.color = 'green'; // เปลี่ยนสีข้อความให้เป็นสีเขียว
            messageElement.style.display = 'block'; // ทำให้ข้อความแสดงขึ้นมา
            // เก็บข้อมูลใน sessionStorage
            sessionStorage.setItem('form1', JSON.stringify(data));
            // นำไปยังหน้า userInfo.html
            window.location.href = 'userhome.html';
        } else {
            showError('INVALID_CREDENTIALS');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('INVALID_CREDENTIALS');
    });
} 

// ฟังก์ชันที่เรียกใช้ข้อมูลจาก sessionStorage เมื่อหน้าเว็บโหลด
function loadSavedCredentials() {
    const savedUsername = sessionStorage.getItem('username');
    const savedPassword = sessionStorage.getItem('password');
    const savedRole = sessionStorage.getItem('role');

    if (savedUsername && savedPassword && savedRole) {
        // กรอกข้อมูล username และ password ที่เก็บไว้
        document.getElementById('username').value = savedUsername;
        document.getElementById('password').value = savedPassword;
        document.getElementById('role').value = savedRole;
    }
}

// เรียกใช้ฟังก์ชัน loadSavedCredentials เมื่อหน้าเว็บโหลด
window.onload = loadSavedCredentials;
