-- Homie Waitlist Database Schema (MySQL)
-- Run this on your MySQL server to create the waitlist table

CREATE DATABASE IF NOT EXISTS homie_waitlist;
USE homie_waitlist;

CREATE TABLE IF NOT EXISTS waitlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: create a dedicated user for the app
-- CREATE USER 'homie'@'localhost' IDENTIFIED BY 'your_password';
-- GRANT SELECT, INSERT ON homie_waitlist.* TO 'homie'@'localhost';
-- FLUSH PRIVILEGES;
