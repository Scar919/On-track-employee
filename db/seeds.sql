INSERT INTO department (dept_name)
VALUES
('Engineering'),
('Finance'),
('Recruiting');

INSERT INTO roles (title, salary, department_id)
VALUES
('Engineer', 90000, 1),
('Sales', 85000, 2),
('Recruiters', 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tom', 'Ford', 2, NULL),
('Steve', 'Jobs', 1, 1),
('Carol', 'Lopez', 3, NULL);