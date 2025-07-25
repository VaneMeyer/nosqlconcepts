db = db.getSiblingDB('exampledb');
db.createCollection('users');
db.users.insertMany([{ name: 'Alice' }, { name: 'Bob' }]);