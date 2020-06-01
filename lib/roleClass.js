
class Role {
    constructor(id, title, salary, deptId, deptName) {
      this.id = id;
      this.title = title;
      this.salary = salary;
      this.deptId = deptId;
      this.deptName = deptName;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return this.salary;
    }

    getDeptId() {
        return this.deptId;
    }

    getDeptName() {
        return this.deptName;
    }
  }

  module.exports = Role;
