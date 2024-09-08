document.addEventListener("DOMContentLoaded", function() {
    // ดึงข้อมูลจาก localStorage
    var fullname = localStorage.getItem("fullname");
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");

    // ตรวจสอบว่า fullname มีค่าหรือไม่ ถ้าไม่มีให้ส่งผู้ใช้ไปยังหน้า index.html
    if (!fullname) {
        window.location.href = "index.html";
        return; // หยุดการทำงานของสคริปต์ถัดไป
    }

    // แสดงข้อความต้อนรับในส่วนเนื้อหา
    document.querySelector(".content p").innerText = `Welcome, ${fullname}`;

    // สร้าง payload สำหรับส่งไปยัง API
    var payload = {
        "username": username,
        "password": password
    };

    // ส่งข้อมูลไปยัง API
    fetch("https://c1app.pea.co.th/idm-login/api_login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error === true) {
            // ลบข้อมูลใน localStorage เมื่อมีข้อผิดพลาด
            localStorage.removeItem("fullname");
            localStorage.removeItem("empId");
            localStorage.removeItem("username");
            localStorage.removeItem("password");

            // กลับไปที่หน้า index.html
            window.location.href = "index.html";
        }
    });

    // ฟังก์ชัน logout
    function handleLogout() {
        // เคลียร์ข้อมูลใน localStorage
        localStorage.removeItem("fullname");
        localStorage.removeItem("empId");
        localStorage.removeItem("username");
        localStorage.removeItem("password");

        // กลับไปที่หน้า index.html
        window.location.href = "index.html";
    }

    // แนบฟังก์ชัน handleLogout ไปยังปุ่ม logout
    document.querySelector(".logout").addEventListener("click", handleLogout);

    // ฟังก์ชัน handleSubmit

    // แนบฟังก์ชัน handleSubmit ไปยังปุ่ม submit
    document.querySelector("input[type='button']").addEventListener("click", handleSubmit);
});
function handleSubmit() {
    // ดึงค่าจากช่องกรอกข้อมูล
    var field1 = document.getElementById("field1").value;
    var field2 = document.getElementById("field2").value;
    var field3 = document.getElementById("field3").value;
    var field4 = document.getElementById("field4").value;

    // ตรวจสอบห้ามมีตัวอักษรจุด (.)
    if ([field1, field2, field3, field4].some(field => field.includes('.'))) {
        alert("ห้ามมีตัวอักษรจุด (.) ในช่องข้อมูล!");
        return;
    }

    // ตรวจสอบ field4 และอย่างน้อยหนึ่งใน field1-3
    if (!field4) {
        alert("คำตอบต้องพิมพ์อะไรสักอย่าง!");
        return;
    }
    if (!field1 && !field2 && !field3) {
        alert("ต้องมีค่าในช่องคำค้นหาอย่างน้อย 1 ช่อง!");
        return;
    }

    // ดึงข้อมูลจาก localStorage
    var username = localStorage.getItem("username") || "unknown";
    var fullname = localStorage.getItem("fullname") || "unknown";
    var currentTime = new Date().toISOString();

    // สร้าง JSON payload
    var payload = {
        field1: field1 || undefined,
        field2: field2 || undefined,
        field3: field3 || undefined,
        field4: field4,
        userid: username,
        username: fullname,
        time: currentTime
    };

    console.log("Generated JSON payload:\n", JSON.stringify(payload, null, 2));

    // ส่งข้อมูลไปยัง API พร้อม param = save
    const url = new URL('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxMgJF9hvxmYwjhBupqDaXymzB6ZrhgvMfb9U0ngyy07JeT1M4z_ooQeip05hiSWPgr/exec');
    url.searchParams.append('param', 'save'); // เพิ่ม param=save ใน query string

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
    })
    .then(response => response.text())
    .then(data => console.log("Response:", data))
    .catch(error => console.error('Error:', error));
}


