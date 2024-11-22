// Define error messages
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

// Show error popup
function showError(errorType) {
    // Remove any existing error popups first
    const existingOverlay = document.querySelector('.overlay');
    if (existingOverlay) {
        document.body.removeChild(existingOverlay);
    }

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

    // Function to close the error popup
    const closeErrorPopup = () => {
        const overlayToRemove = document.querySelector('.overlay');
        if (overlayToRemove) {
            overlayToRemove.remove();
        }
    };

    // Add click event to OK button
    okButton.onclick = closeErrorPopup;

    // Add click event to overlay for closing when clicking outside
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeErrorPopup();
        }
    };

    // Add escape key event listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeErrorPopup();
        }
    });

    popup.appendChild(iconContainer);
    popup.appendChild(message);
    popup.appendChild(okButton);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}

// Login function with remember username and password
function submitLogin(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const remember = document.getElementById('remember')?.checked;

    if (!username || !password) {
        showError('EMPTY_FIELDS');
        return;
    }

    // Remember username and password if checked
    if (remember) {
        localStorage.setItem('rememberedUsername', username);
        localStorage.setItem('rememberedPassword', password);
    } else {
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
    }

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
            localStorage.setItem('form1', JSON.stringify(data));
            window.location.href = 'html/home.html';
        } else {
            showError('INVALID_CREDENTIALS');
        }
    })
    .catch(() => showError('INVALID_CREDENTIALS'));
}

// Load remembered username and password on page load
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('remember').checked = true;
    }

    if (rememberedPassword) {
        document.getElementById('password').value = rememberedPassword;
    }

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

function saveStudentData(data) {
    fetch('http://localhost:8080/api/students/add', { // URL ต้องตรงกับ Spring Boot endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            engName: data.displayname_en,
            email: data.email,
            faculty: data.faculty,
            type: data.type,
            userName: data.username
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