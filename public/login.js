document.addEventListener("DOMContentLoaded", function() {
    // ดึงข้อมูลจาก localStorage
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");

    // ตรวจสอบว่ามีข้อมูล username และ password ใน localStorage หรือไม่
    if (username && password) {
        // ถ้ามีข้อมูลใน localStorage ให้สร้าง payload และตรวจสอบกับ API
        var payload = {
            "username": username,
            "password": password
        };

        // ส่ง request ไปยัง API
        fetch("https://c1app.pea.co.th/idm-login/api_login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error === false) {
                // ถ้า login สำเร็จ ให้ไปที่หน้า Page1.html
                window.location.href = "Page1.html";
            } else {
                // ถ้า login ไม่สำเร็จ ให้แสดงข้อความ error และเคลียร์ข้อมูลใน localStorage
                localStorage.removeItem("fullname");
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                document.getElementById("message").textContent = "Stored login failed, please log in again.";
                document.getElementById("message").style.color = "red";
            }
        })
        .catch(error => {
            // กรณีเกิดข้อผิดพลาดในการเชื่อมต่อหรือการประมวลผล
            document.getElementById("message").textContent = "Error: " + error.message;
            document.getElementById("message").style.color = "red";
        });
    } else {
        // ถ้าไม่มีข้อมูลใน localStorage ให้แสดงข้อความหรือดำเนินการอื่นตามต้องการ
        document.getElementById("message").textContent = "Please log in.";
        document.getElementById("message").style.color = "black";
    }
});

function handleLogin(event) {
    event.preventDefault(); // ป้องกันการ reload หน้า

    // ถ้าไม่มีข้อมูลใน localStorage ให้ดึงข้อมูลจากฟอร์ม
    var u = document.getElementById("username").value;
    var p = document.getElementById("password").value;

    // สร้าง payload จากข้อมูลที่กรอกในฟอร์ม
    var payload = {
        "username": u,
        "password": p
    };

    // ส่ง request ไปยัง API
    fetch("https://c1app.pea.co.th/idm-login/api_login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === false) {
            // ถ้า login สำเร็จ เก็บข้อมูลลงใน localStorage
            localStorage.setItem("fullname", data.fullname);
            localStorage.setItem("username", u);
            localStorage.setItem("password", p);

            // แล้วเปลี่ยนหน้าไปที่ Page1.html
            window.location.href = "Page1.html";
        } else {
            // กรณี login ล้มเหลว ให้แสดงข้อความ error
            document.getElementById("message").textContent = "Login failed!";
            document.getElementById("message").style.color = "red";
        }
    })
    .catch(error => {
        // กรณีเกิดข้อผิดพลาดในการเชื่อมต่อหรือการประมวลผล
        document.getElementById("message").textContent = "Error: " + error.message;
        document.getElementById("message").style.color = "red";
    });
}
