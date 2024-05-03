USE mysql;
CREATE USER IF NOT EXISTS 'prgms'@'localhost' IDENTIFIED BY 'prgms';
CREATE USER IF NOT EXISTS 'prgms'@'%' IDENTIFIED BY 'prgms';
GRANT ALL PRIVILEGES ON prgms_notes.* TO 'prgms'@'localhost';
GRANT ALL PRIVILEGES ON prgms_notes.* TO 'prgms'@'%';
FLUSH PRIVILEGES;
