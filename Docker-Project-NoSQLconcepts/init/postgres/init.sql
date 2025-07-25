
--AUTHORIZATION postgres;

-- default schema "public"

--CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));
--INSERT INTO users (name) VALUES ('Alice'), ('Bob');



DROP TABLE IF EXISTS Students CASCADE;
CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    degree_program VARCHAR(100),
    graduation_year INT
);


DROP TABLE IF EXISTS GraduationCeremonies CASCADE;
CREATE TABLE GraduationCeremonies (
    ceremony_id SERIAL PRIMARY KEY,
    date DATE,
    location VARCHAR(100),
    note TEXT
);


DROP TABLE IF EXISTS Invitations CASCADE;
CREATE TABLE Invitations (
    invitation_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Students(student_id),
    ceremony_id INT REFERENCES GraduationCeremonies(ceremony_id),
    rsvp BOOLEAN DEFAULT FALSE
);


DROP TABLE IF EXISTS ProgramItems CASCADE;
CREATE TABLE ProgramItems (
    item_id SERIAL PRIMARY KEY,
    ceremony_id INT REFERENCES GraduationCeremonies(ceremony_id),
    title VARCHAR(100),
    start_time TIME,
    duration_minutes INT
);


DROP TABLE IF EXISTS Sponsors CASCADE;
CREATE TABLE Sponsors (
    sponsor_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    amount NUMERIC(10,2)
);




INSERT INTO Students (first_name, last_name, degree_program, graduation_year) VALUES
('Anna', 'Miller', 'Computer Science', 2025),
('Ben', 'Smith', 'Mechanical Engineering', 2025),
('Clara', 'White', 'Business Administration', 2025),
('David', 'Fisher', 'Computer Science', 2025),
('Eva', 'Taylor', 'Psychology', 2025),
('Felix', 'Brown', 'Computer Science', 2025),
('Greta', 'Wilson', 'Business Administration', 2025),
('Hannah', 'Moore', 'Psychology', 2025),
('Isabel', 'Clark', 'Mechanical Engineering', 2025),
('Jonas', 'Lewis', 'Computer Science', 2025);


INSERT INTO GraduationCeremonies (date, location, note) VALUES
('2025-07-15', 'Main Auditorium', 'Main summer graduation ceremony.'),
('2025-12-10', 'City Hall', 'Winter graduation ceremony.');


INSERT INTO Invitations (student_id, ceremony_id, rsvp) VALUES
(1, 1, TRUE),
(2, 1, FALSE),
(3, 1, TRUE),
(4, 1, TRUE),
(5, 1, FALSE),
(6, 1, TRUE),
(7, 1, TRUE),
(8, 1, TRUE),
(9, 1, FALSE),
(10, 1, TRUE);


INSERT INTO ProgramItems (ceremony_id, title, start_time, duration_minutes) VALUES
(1, 'Welcome Speech', '10:00', 15),
(1, 'Keynote Address', '10:15', 30),
(1, 'Award Ceremony', '10:45', 20),
(1, 'Student Speech', '11:05', 10),
(1, 'Musical Performance', '11:15', 15),
(1, 'Closing Remarks', '11:30', 10);


INSERT INTO Sponsors (name, amount) VALUES
('TechCorp Inc.', 5000.00),
('Future Minds Foundation', 2500.00),
('Local Bank', 1500.00),
('Green Energy Ltd.', 2000.00);

