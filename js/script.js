// กำหนด error messages
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: { 
        th: 'กรุณาลองใหม่อีกครั้ง', 
        en: 'Invalid login, please try again' 
    },
    EMPTY_FIELDS: { 
        th: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 
        en: 'Please enter both username and password.' 
    }
};

// แสดง error popup
function showError(errorType) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const popup = document.createElement('div');
    popup.className = 'popup';

    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';

    const xIcon = document.createElement('span');
    xIcon.textContent = '×';
    xIcon.className = 'x-icon';
    iconContainer.appendChild(xIcon);

    const message = document.createElement('div');
    message.textContent = ERROR_MESSAGES[errorType].en;
    message.className = 'error-message';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.className = 'ok-button';

    okButton.onclick = () => document.body.removeChild(overlay);

    popup.appendChild(iconContainer);
    popup.appendChild(message);
    popup.appendChild(okButton);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// ฟังก์ชันสำหรับ login
function submitLogin(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

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
        if (data.status === true) {
            localStorage.setItem('html/form1', JSON.stringify(data));
            window.location.href = 'html/home.html';
        } else {
            showError('INVALID_CREDENTIALS');
        }
    })
    .catch(() => showError('INVALID_CREDENTIALS'));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Login button event
    const loginButton = document.querySelector('button');
    if (loginButton) {
        loginButton.addEventListener('click', submitLogin);
    }

    // Enter key event
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitLogin();
            }
        });
    });
});