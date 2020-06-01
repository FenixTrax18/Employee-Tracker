--Drop employees_db if currently exists
DROP DATABASE IF EXISTS employees_db;
--Create employees_db
CREATE DATABASE employees_db;

-- The following code will affect employees_db
USE employees_db;

--Create the department table within employees_db
CREATE TABLE [departments] (
  id INTEGER NOT NULL AUTO_INCREMENT, --Create integer column for id
  name VARCHAR(30), --Create varchar30 column for name (department name)
  PRIMARY KEY (id) --Set id as primary key
);

--Create the role table within employees_db
CREATE TABLE [roles] (
  id INTEGER NOT NULL AUTO_INCREMENT, --Create integer column for id
  title VARCHAR(30), --Create varchar30 column for title (role title)
  salary DECIMAL(10,2), --Create decimal column for salary (role salary)
  department_id INTEGER, --Create integer column for department id (integer to hold reference to department role belongs to)
  PRIMARY KEY (id), --Set id as primary key
  FOREIGN KEY (department_id) REFERENCES department(id)
);

--Create the employee table within employees_db
CREATE TABLE [employees] (
  id INTEGER NOT NULL AUTO_INCREMENT, --Create integer column for id
  first_name VARCHAR(30), --Create varchar30 column for employee first name
  last_name VARCHAR(30), --Create varchar30 column for employee last name
  role_id INTEGER, --Create integer column for role id (integer to hold reference to role employee has)
  manager_id INTEGER NULL, --Create integer column for manager id (integer to hold reference to another employee that manager of the current employee - field may be null if employee has no manager)
  PRIMARY KEY (id), --Set id as primary key
  FOREIGN KEY (role_id) REFERENCES role(id), --connect role id to id in roles table
  FOREIGN KEY (manager_id) REFERENCES employee(id) --connect manager id to employee table id
);










--------------------------------------------------------------------------------------------------
-- Creates the table "people" within animals_db --
CREATE TABLE people (
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  has_pet BOOLEAN NOT NULL,
  -- Makes a sting column called "pet_name" --
  pet_name VARCHAR(30),
  -- Makes an numeric column called "pet_age" --
  pet_age INTEGER(10)
);

-- Creates new rows containing data in all named columns --
INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", TRUE, "Misty", 10);

INSERT INTO people (name, has_pet)
VALUES ("Peter", false);

-- Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE name = "Peter";
