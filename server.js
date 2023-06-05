const express = require('express');
const next = require('next');
const jenosizeController = require('./src/controller/jenosize');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Express!' });
  });

  server.post('/api/game24', (req, res) => {
    const numbers = req.body.numbers; // รับข้อมูลตัวเลขจากคำขอ
  
    try {
      const is24 = jenosizeController.calculate24(numbers);
  
      if (is24) {
        res.json({ result: 'YES' }); // ส่งผลลัพธ์เป็น 'YES' ถ้าผลรวมเท่ากับ 24 ex. 1,2,3,4
      } else {
        res.json({ result: 'NO' }); // ส่งผลลัพธ์เป็น 'NO' ถ้าผลรวมไม่เท่ากับ 24 ex. 1,9,9,8
      }
    } catch (error) {
      res.status(400).json({ error: error.message }); // ส่งข้อความผิดพลาดกลับไปให้ client
    }
  });

  server.get('/api/restaurants', async (req, res) => {
    const { query } = req.query; // รับค่าร้านอาหารจาก query parameter
    
    // สร้าง URL สำหรับเรียก API Nominatim ของ OpenStreetMap
    // เนื่องจาก Place API จาก GoogleMap เสียค่าใข้จ่าย จึงใช้ของ OpenStreetMap
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
    
    try {
      // เรียก API Nominatim ด้วย Fetch API
      const response = await fetch(url);
      const data = await response.json();
    
      res.json(data); // ส่งผลลัพธ์กลับเป็น JSON
    } catch (error) {
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
  });

  // ให้ Next.js จัดการเส้นทางที่ไม่ได้ถูกจัดการโดย Express.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
