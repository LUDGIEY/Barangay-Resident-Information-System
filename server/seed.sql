USE barangay_db;

-- Initial Users
INSERT INTO USERS (username, password_hash, role, full_name) VALUES 
('admin', 'admin123', 'Admin', 'Barangay Secretary'),
('staff', 'staff123', 'Staff', 'Barangay Clerk');

-- Initial Households
INSERT INTO HOUSEHOLDS (household_number, street_address, purok_zone, latitude, longitude) VALUES 
('HH-001', 'Rizal St.', 'Purok 1', 14.5995, 120.9842),
('HH-002', 'Mabini St.', 'Purok 2', 14.6010, 120.9850);

-- Initial Residents
INSERT INTO RESIDENTS (household_id, first_name, last_name, birth_date, gender, civil_status, is_voter, is_pwd, occupation) VALUES 
(1, 'John', 'Doe', '1990-05-15', 'Male', 'Single', TRUE, FALSE, 'Software Developer'),
(1, 'Jane', 'Doe', '1992-08-20', 'Female', 'Single', TRUE, FALSE, 'Graphic Designer'),
(2, 'Bob', 'Smith', '1985-12-10', 'Male', 'Married', TRUE, TRUE, 'Farmer');

-- Initial Certificates
INSERT INTO CERTIFICATES (resident_id, issued_by_user_id, cert_type, purpose, control_number) VALUES 
(1, 1, 'Barangay Clearance', 'Employment', 'CERT-2026-001'),
(2, 1, 'Certificate of Indigency', 'Medical Assistance', 'CERT-2026-002');
