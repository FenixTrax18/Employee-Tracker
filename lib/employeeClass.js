
class Employee {
    constructor(id, firstName, lastName, roleId, title, salary, deptName, managerId, mngrFirstName, mngrLastName) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.roleId = roleId;
      this.title = title;
      this.salary = salary;
      this.deptName = deptName;
      this.managerId = managerId;
      this.mngrFirstName = mngrFirstName;
      this.mngrLastName = mngrLastName;
    }

    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getFullName() {
        const fullName = this.getFirstName() + " " + this.getLastName();
        return fullName;
    }

    getRoleId() {
        return this.roleId;
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return this.salary;
    }

    getDeptName() {
        return this.deptName;
    }

    getManagerId() {
        return this.managerId;
    }

    getMngrFirstName() {
        return this.mngrFirstName;
    }

    getMngrLastName() {
        return this.mngrLastName;
    }
  }
  
  module.exports = Employee;
