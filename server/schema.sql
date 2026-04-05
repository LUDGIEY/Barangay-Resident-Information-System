CREATE DATABASE IF NOT EXISTS barangay_db;
USE barangay_db;

CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    full_name VARCHAR(100) NOT NULL
);

CREATE TABLE HOUSEHOLDS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    household_number VARCHAR(50) UNIQUE NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    purok_zone VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE RESIDENTS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    household_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10),
    civil_status VARCHAR(20),
    is_voter BOOLEAN DEFAULT FALSE,
    is_pwd BOOLEAN DEFAULT FALSE,
    occupation VARCHAR(100),
    FOREIGN KEY (household_id) REFERENCES HOUSEHOLDS(id) ON DELETE SET NULL
);

CREATE TABLE CERTIFICATES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT,
    issued_by_user_id INT,
    cert_type VARCHAR(100) NOT NULL,
    purpose TEXT,
    date_issued DATETIME DEFAULT CURRENT_TIMESTAMP,
    control_number VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (resident_id) REFERENCES RESIDENTS(id) ON DELETE CASCADE,
    FOREIGN KEY (issued_by_user_id) REFERENCES USERS(id) ON DELETE SET NULL
);

CREATE TABLE BLOTTER_RECORDS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complainant_id INT,
    respondent_id INT,
    incident_type VARCHAR(100) NOT NULL,
    incident_date DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    narrative TEXT,
    FOREIGN KEY (complainant_id) REFERENCES RESIDENTS(id) ON DELETE CASCADE,
    FOREIGN KEY (respondent_id) REFERENCES RESIDENTS(id) ON DELETE CASCADE
);
