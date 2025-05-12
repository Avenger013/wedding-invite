const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

const db = new sqlite3.Database('./guests.sqlite3');

db.run(`CREATE TABLE IF NOT EXISTS guests (
  "Имя и фамилия 1" TEXT,
  "Имя и фамилия 2" TEXT,
  "Имя и фамилия 3" TEXT,
  "Присутствие (ответ)" TEXT,
  "Напитки (ответ)" TEXT,
  "Второй день (ответ)" TEXT
)`);


app.use(express.static(__dirname));
app.use(express.json());

app.post('/submit', (req, res) => {
  const { name1, name2, name3, attendance, drinks, attendance2 } = req.body;
  const drinksStr = (drinks || []).join(', ');
  const stmt = db.prepare(`INSERT INTO guests ("Имя и фамилия 1", "Имя и фамилия 2", "Имя и фамилия 3", "Присутствие (ответ)", "Напитки (ответ)", "Второй день (ответ)") VALUES (?, ?, ?, ?, ?, ?)`);
stmt.run(name1, name2, name3, attendance, drinksStr, attendance2, (err) => {
  if (err) {
    console.error(err);
    res.status(500).send("Ошибка при записи");
  } else {
    res.send("OK");
  }
});

});
app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));
