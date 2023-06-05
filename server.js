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
  // ให้ Next.js จัดการเส้นทางที่ไม่ได้ถูกจัดการโดย Express.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
