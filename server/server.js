const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./calcapp.db', (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('Підключено до бази даних SQLite.');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    gender TEXT,
    dob TEXT,
    password TEXT,
    regDate TEXT
)`);

app.post('/api/register', (req, res) => {
    const { name, email, gender, dob, password, regDate } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Невірний формат email! Приклад: name@domain.com" });
    }

    const sql = `INSERT INTO users (name, email, gender, dob, password, regDate) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [name, email, gender, dob, password, regDate], function(err) {
        if (err) {
            return res.status(400).json({ error: "Користувач з таким email вже існує" });
        }
        res.json({ message: "Реєстрація успішна!", id: this.lastID });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: "Невірний Email або пароль!" });
        }
        res.json({ message: "Успішний вхід", user: row });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});