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

    // เก็บข้อมูลใน sessionStorage
    //sessionStorage.setItem('username', username);
    //sessionStorage.setItem('password', password);

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU5d9c2f64dba5a79b5703f16217099f581aa997f95cea8f85ee3303e96d2af4fa9389bf05fe88938703a7a4a10e198098'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('INVALID_CREDENTIALS');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === true) {
            // เก็บข้อมูลผู้ใช้ใน localStorage เพื่อใช้ในหน้า form1
            localStorage.setItem('html/form1', JSON.stringify(data));
            
            // นำทางไปยังหน้า form1
            window.location.href = 'html/home.html';
        } else {
            showError('INVALID_CREDENTIALS');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('INVALID_CREDENTIALS');
    });
}


// Toggle password visibility
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Add event listener to login button if it exists
    const loginButton = document.querySelector('button');
    if (loginButton) {
        loginButton.addEventListener('click', submitLogin);
    }
});

// Check if user is already logged in when loading form1.html
if (window.location.href.includes('html/form1.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            // ถ้าไม่มีข้อมูลผู้ใช้ ให้กลับไปหน้า login
            window.location.href = 'index.html';
        }
    });
}