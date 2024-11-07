const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: { 
        th: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 
        en: 'Invalid username or password.' 
    },
    EMPTY_FIELDS: { 
        th: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 
        en: 'Please enter both username and password.' 
    },
    SUCCESS: { 
        th: 'เข้าสู่ระบบสำเร็จ', 
        en: 'Login successful' 
    }
};

// ฟังก์ชันแสดงข้อความสำเร็จในป้ายแจ้งเตือน
function showSuccess() {
    const notificationElement = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    messageElement.innerText = `${ERROR_MESSAGES.SUCCESS.th} (${ERROR_MESSAGES.SUCCESS.en})`;
    notificationElement.style.backgroundColor = '#4CAF50'; // สีเขียวสำหรับสำเร็จ
    notificationElement.style.display = 'block'; // แสดงป้ายแจ้งเตือน
}

// ฟังก์ชันแสดงข้อความผิดพลาดในป้ายแจ้งเตือน
function showError(errorType) {
    const notificationElement = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    const thMessage = ERROR_MESSAGES[errorType].th;
    const enMessage = ERROR_MESSAGES[errorType].en;
    messageElement.innerText = `${thMessage} (${enMessage})`;
    notificationElement.style.backgroundColor = '#f44336'; // สีแดงสำหรับข้อผิดพลาด
    notificationElement.style.display = 'block'; // แสดงป้ายแจ้งเตือน
}

// ฟังก์ชันสำหรับปิดป้ายแจ้งเตือนเมื่อกด "OK"
function closeNotification() {
    const notificationElement = document.getElementById('notification');
    notificationElement.style.display = 'none'; // ซ่อนป้ายแจ้งเตือน
}

// ฟังก์ชันสำหรับส่งข้อมูลเข้าสู่ระบบ
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // ตรวจสอบข้อมูลว่าง
    if (!username || !password) {
        showError('EMPTY_FIELDS');
        return;
    }

    // เก็บข้อมูลใน sessionStorage
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('role', role);

    // เรียก API เพื่อตรวจสอบข้อมูลผู้ใช้
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
        if (data.status === true) {
            showSuccess(); // แสดงข้อความสำเร็จ
            sessionStorage.setItem('form1', JSON.stringify(data)); // เก็บข้อมูลใน sessionStorage
            window.location.href = 'userhome.html'; // นำไปยังหน้า userhome.html
        } else {
            showError('INVALID_CREDENTIALS'); // แสดงข้อความผิดพลาด
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('INVALID_CREDENTIALS'); // แสดงข้อความผิดพลาดเมื่อเกิดข้อผิดพลาด
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
