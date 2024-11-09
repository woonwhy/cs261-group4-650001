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
};

// ฟังก์ชันยกเลิกและกลับไปหน้าหลัก
function cancel() {
    // นำผู้ใช้กลับไปยังหน้าหลัก
    window.location.href = 'userhome.html';
}