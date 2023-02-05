-- DROP DATABASE IF EXISTS employee_db;
-- CREATE DATABASE employee_db;

-- USE employee_db;

-- CREATE TABLE department (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     department VARCHAR(30),
-- );

-- CREATE TABLE role (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--    title VARCHAR(30),
--     salary DECIMAL,
--     department_id INT,
--     INDEX dep_ind (department_id),
--     FOREIGN KEY(department_id)
--     REFERENCES department(id)
--     ON DELETE CASCADE,
-- );

-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     role_id INT,
--     INDEX role_ind (role_id),
--     FOREIGN KEY(role_id) 
--     REFERENCES role(id) 
--     ON DELETE CASCADE,
--     manager_id INT,
--     INDEX man_ind (manager_id),
--     FOREIGN KEY (manager_id) 
--     REFERENCES employee(id)
 --    ON DELETE SET NULL,
-- );

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
    CONSTRAINT selfkey FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
)