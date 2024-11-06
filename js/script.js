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

    // ตรวจสอบข้อมูลว่าง
    if (!username || !password) {
        showError('EMPTY_FIELDS');
        return;
    }

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
            // เก็บข้อมูลใน Local Storage
            localStorage.setItem('form1', JSON.stringify(data));
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

function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบข้อมูลว่าง
    if (!username || !password) {
        showError('EMPTY_FIELDS');
        return;
    }

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({ myName: username, lastName: password}).toString()
    );
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('INVALID_CREDENTIALS');
            }
            return response.text();
        })
        .then(text => {
            document.getElementById('message').style.color = 'black';
            document.getElementById('message').innerText = text;
        })
        .catch(error => {
            console.error('Error:', error);
            showError('INVALID_CREDENTIALS');
        });
}