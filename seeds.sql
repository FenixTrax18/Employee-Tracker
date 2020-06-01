-- used to preload data
/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employees_db;

/* Insert 3 Rows into your new table */
INSERT INTO departments (name)
VALUES ("Human Resources"), ("Sales"), ("Administration"), ("Quality Assurance"), ("Accounting"), ("Packaging"), ("Customer Relations"), ("Purchasing");

INSERT INTO roles (title, salary, department_id)
VALUES ("Regional Manager", 100000.00, 3), ("Sales Representative", 60000.00, 2), ("Human Resources Representative", 50000.00, 1), ("Receptionist", 30000.00, 3), ("Accountant", 80000, 5), ("Quality Assurance Representative", 40000, 4), ("Warehouse Manager", 80000,6), ("Customer Service Representative", 40000, 7), ("Supplier Relations Representative", 40000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, NULL), ("Darryl", "Philbin", 7, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Holly", "Flax", 3, 1), ("Dwight", "Schrute", 2, 1), ("Jim", "Halpert", 2, 1), ("Pam", "Beesly", 2, 1), ("Andy", "Bernard", 2, 1), ("Angela", "Martin", 5, 1), ("Creed", "Bratton", 6, 1), ("Erin", "Hannon", 4, 1), ("Kelly", "Kapoor", 8, 1), ("Kevin", "Malone", 5, 1), ("Meredith", "Palmer", 9, 1), ("Oscar", "Martinez", 5, 1), ("Phyllis", "Vance", 9, 1), ("Ryan", "Howard", 2, 1), ("Stanley", "Hudson", 2, 1);
