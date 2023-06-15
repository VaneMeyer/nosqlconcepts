//Example with mysql

const mysql = require('mysql');
const config = require('../do-not-publish/db-config');

const host = config.db.host;
const user = config.db.user;
const password = config.db.password;
const database = config.db.database;

// Verwendung der Konfigurationsvariablen, z. B. um die Verbindung zur MySQL-Datenbank herzustellen


const connection = mysql.createConnection({
  host: host,       // Der Hostname der MySQL-Datenbank
  user: user,        // Der Benutzername für den Datenbankzugriff
  password: password,    // Das Passwort für den Datenbankzugriff
  database: database     // Der Name der Datenbank
});

connection.connect((err) => {
  if (err) {
    console.error('Fehler beim Verbinden zur MySQL-Datenbank: ' + err.stack);
    return;
  }
  console.log('Erfolgreich zur MySQL-Datenbank verbunden als ID ' + connection.threadId);
});

// Jetzt kannst du Datenbankabfragen ausführen und mit der MySQL-Datenbank interagieren

/*
connection.query('SELECT * FROM table_name', (err, results) => {
  if (err) {
    console.error('Fehler bei der Datenbankabfrage: ' + err.stack);
    return;
  }
  // Die Ergebnisse der Abfrage befinden sich im 'results'-Array
  console.log('Abfrageergebnisse:', results);
});

*/