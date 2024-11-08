<<<<<<< HEAD
<<<<<<< HEAD
// กำหนด error messages
=======
>>>>>>> 09fcce269c1c87211a44e68b6ade8fed92de5fbc
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: { 
        th: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 
        en: 'Invalid username or password.' 
    },
    EMPTY_FIELDS: { 
        th: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 
        en: 'Please enter both username and password.' 
<<<<<<< HEAD
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

=======
>>>>>>> 72735a1 (Template)
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

<<<<<<< HEAD
=======
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

>>>>>>> 09fcce269c1c87211a44e68b6ade8fed92de5fbc
    // ตรวจสอบข้อมูลว่าง
    if (!username || !password) {
        showError('EMPTY_FIELDS');
        return;
    }

    // เก็บข้อมูลใน sessionStorage
<<<<<<< HEAD
    //sessionStorage.setItem('username', username);
    //sessionStorage.setItem('password', password);

=======
>>>>>>> 72735a1 (Template)
=======
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('role', role);

    // เรียก API เพื่อตรวจสอบข้อมูลผู้ใช้
>>>>>>> 09fcce269c1c87211a44e68b6ade8fed92de5fbc
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 09fcce269c1c87211a44e68b6ade8fed92de5fbc
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
<<<<<<< HEAD
            // เก็บข้อมูลผู้ใช้ใน localStorage เพื่อใช้ในหน้า form1
            localStorage.setItem('html/form1', JSON.stringify(data));
            
            // นำทางไปยังหน้า form1
            window.location.href = 'html/home.html';
        } else {
            showError('INVALID_CREDENTIALS');
=======
            'Application-Key': 'TU5d9c2f64dba5a79b5703f16217099f581aa997f95cea8f85ee3303e96d2af4fa9389bf05fe88938703a7a4a10e198098'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === true) {
            document.getElementById('message').innerText = "Login successful!";
            displayUserData(data);
        } else {
            document.getElementById('message').innerText = data.message;
>>>>>>> 72735a1 (Template)
=======
            showSuccess(); // แสดงข้อความสำเร็จ
            sessionStorage.setItem('form1', JSON.stringify(data)); // เก็บข้อมูลใน sessionStorage
            window.location.href = 'userhome.html'; // นำไปยังหน้า userhome.html
        } else {
            showError('INVALID_CREDENTIALS'); // แสดงข้อความผิดพลาด
>>>>>>> 09fcce269c1c87211a44e68b6ade8fed92de5fbc
        }
    })
    .catch(error => {
        console.error('Error:', error);
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        document.getElementById('message').innerText = error.message;
    });
}

// Function to toggle the login button's enabled state based on form completion
function toggleLoginButton() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginButton = document.querySelector('button');

    if (username && password && role !== "") {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

// Add event listeners to check for input and toggle the login button
document.getElementById('username').addEventListener('input', toggleLoginButton);
document.getElementById('password').addEventListener('input', toggleLoginButton);
document.getElementById('role').addEventListener('change', toggleLoginButton);

// Toggle password visibility
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Disable the login button initially
document.querySelector('button').disabled = true;

// Function to display user data in the showdata div
function displayUserData(data) {
    const showDataDiv = document.getElementById('showdata');
    document.getElementById('showdata').style.display ='block';


    // Create HTML structure to show user data
    const userInfoHTML = `
        <h2>User Information</h2>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Display Name (TH):</strong> ${data.displayname_th}</p>
        <p><strong>Display Name (EN):</strong> ${data.displayname_en}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Status:</strong> ${data.tu_status}</p>
        <p><strong>Department:</strong> ${data.department}</p>
        <p><strong>Faculty:</strong> ${data.faculty}</p>
    `;

    // Insert the user information into the div
    showDataDiv.innerHTML = userInfoHTML;
>>>>>>> 72735a1 (Template)
}
=======
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
>>>>>>> 09fcce269c1c87211a44e68b6ade8fed92de5fbc
