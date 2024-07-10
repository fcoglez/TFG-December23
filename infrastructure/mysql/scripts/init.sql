ALTER USER 'sport-center'@'%' IDENTIFIED WITH mysql_native_password BY 'center';

CREATE DATABASE IF NOT EXISTS sport_center;
GRANT ALL PRIVILEGES ON *.* TO "sport-center"@"%";