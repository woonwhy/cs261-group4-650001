async function submitLogin() {
    
    document.getElementById('status').innerText = '';
    document.getElementById('type').innerText = '';
    document.getElementById('username').innerText = '';
    document.getElementById('tu_status').innerText = '';
    document.getElementById('statusid').innerText = '';
    document.getElementById('displayname_th').innerText = '';
    document.getElementById('displayname_en').innerText = '';
    document.getElementById('email').innerText = '';
    document.getElementById('department').innerText = '';
    document.getElementById('faculty').innerText = '';
    document.getElementById('name').innerText = '';


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // ส่งคำขอไปยังเซิร์ฟเวอร์
        const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU96e35caa1e1ab184ba09379ce28b9204bc3d2628dc61edb2217b90f9f8f8ce59d825f1f615e6bed28a7c05da317c8ba3'
            },
            body: JSON.stringify({ UserName: username, PassWord: password })
        });

        // ตรวจสอบสถานะการตอบกลับ
        if (!response.ok) {
            alert('ล็อคอินไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง')
            throw new Error('ล็อคอินไม่สำเร็จ โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
        }

        // แปลงข้อมูลเป็น JSON
        const data = await response.json();

        // แสดงข้อมูลผู้ใช้
        document.getElementById('message').innerText = data.message + '!';
        document.getElementById('status').innerText = 'status : ' + data.status;
        document.getElementById('type').innerText = 'You are : ' + data.type;
        document.getElementById('username').innerText = 'Your username : ' + data.username;
        document.getElementById('tu_status').innerText = 'สถานภาพ : ' + data.tu_status;
        document.getElementById('statusid').innerText = 'status id : ' + data.statusid;
        document.getElementById('displayname_th').innerText = 'Name (ภาษาไทย) : ' + data.displayname_th;
        document.getElementById('displayname_en').innerText = 'Name (ภาษาอังกฤษ) : ' + data.displayname_en;
        document.getElementById('email').innerText = 'Email : ' + data.email;
        document.getElementById('department').innerText = 'หลักสูตร : ' + data.department;
        document.getElementById('faculty').innerText = 'คณะ : ' + data.faculty;
        
        await saveStudentData(data);
    } catch (error) {
        // แสดงข้อความแสดงข้อผิดพลาด
        document.getElementById('message').innerText = error.message;
    }
}

async function saveStudentData(Student) {
    console.log('Preparing to send data:', Student); // ตรวจสอบว่าข้อมูลกำลังจะถูกส่งหรือไม่
    try {
        const response = await fetch('http://localhost:8080/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: Student.username,
                eng_name: Student.displayname_en,
                email: Student.email,
                faculty: Student.faculty,
                type: Student.type
            })
        });
    
        console.log('API Response:', response);
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error('ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง');
        }
    
        console.log('ข้อมูลนักศึกษาถูกบันทึกสำเร็จ');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error.message);
    }
    
}



async function call_REST_API_Hello() {
    
    document.getElementById('status').innerText = '';
    document.getElementById('type').innerText = '';
    document.getElementById('username').innerText = '';
    document.getElementById('tu_status').innerText = '';
    document.getElementById('statusid').innerText = '';
    document.getElementById('displayname_th').innerText = '';
    document.getElementById('displayname_en').innerText = '';
    document.getElementById('email').innerText = '';
    document.getElementById('department').innerText = '';
    document.getElementById('faculty').innerText = '';
    document.getElementById('name').innerText = '';
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        
        const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TU96e35caa1e1ab184ba09379ce28b9204bc3d2628dc61edb2217b90f9f8f8ce59d825f1f615e6bed28a7c05da317c8ba3'
            },
            body: JSON.stringify({ UserName: username, PassWord: password })
        });

    if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาด โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่านอีกครั้ง');
    }

    // แปลงข้อมูลเป็น JSON
    
    const data = await response.json();
        document.getElementById('message').innerText = 'Hello! ';
        document.getElementById('name').innerText = data.displayname_th;
    } catch (error) {
        // แสดงข้อความแสดงข้อผิดพลาด
        document.getElementById('message').innerText = error.message;
    }
}




