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

    // ตรวจสอบห้ามมีตัวอักษรจุด (.) ในช่องข้อมูล
    if (field1.includes('.') || field2.includes('.') || field3.includes('.') || field4.includes('.')) {
        alert("ห้ามมีตัวอักษรจุด (.) ในช่องข้อมูล!");
        return; // หยุดการทำงานของฟังก์ชัน
    }

    // ตรวจสอบว่า field4 มีค่าและมีค่าใน field1-3 อย่างน้อย 1 field
    if (!field4) {
        alert("คำตอบต้องพิมพ์อะไรสักอย่าง!");
        return; // หยุดการทำงานของฟังก์ชัน
    }

    if (!field1 && !field2 && !field3) {
        alert("ต้องมีค่าในช่องคำค้นหาอย่างน้อย 1 ช่อง!");
        return; // หยุดการทำงานของฟังก์ชัน
    }

    // ดึงข้อมูลจาก localStorage
    var username = localStorage.getItem("username");
    var fullname = localStorage.getItem("fullname");
    var currentTime = new Date().toISOString(); // ใช้ค่าวันเวลาปัจจุบัน

    // สร้าง JSON payload รวมค่าทุก field ที่มีค่า
    var payload = {};

    if (field1) {
        payload.field1 = field1;
    }
    if (field2) {
        payload.field2 = field2;
    }
    if (field3) {
        payload.field3 = field3;
    }
    payload.field4 = field4;
    payload.userid = username;
    payload.username = fullname;
    payload.time = currentTime;

    // แสดง JSON payload แบบหลายบรรทัด
    console.log("Generated JSON payload:\n", JSON.stringify(payload, null, 2));

    // ส่งข้อมูลไปยัง API
    fetch('https://script.google.com/macros/s/AKfycbxMgJF9hvxmYwjhBupqDaXymzB6ZrhgvMfb9U0ngyy07JeT1M4z_ooQeip05hiSWPgr/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field1: 'value1',
          field2: 'value2',
          field3: 'value3',
          field4: 'value4',
          userid: '123',
          username: 'user',
          time: new Date().toISOString()
        }),
        mode: 'cors' // หรือ 'no-cors' ถ้าคุณต้องการทดสอบแบบไม่ทำการตรวจสอบ CORS
      })
      .then(response => response.text()) // ใช้ .json() หากต้องการรับข้อมูล JSON
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}


