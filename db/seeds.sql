USE employee_db;

INSERT INTO department (department)
VALUES 
("Management"),
("Engineering"),
("Interns");

INSERT INTO role(title, salary, department_id)
VALUES
("Manager", "100000", 1),
("Engineer", "95000", 2),
("Intern", "60000", 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, NULL),
("Jane", "Doe", 2, 1),
("Corbin", "Cutter", 3, 1);