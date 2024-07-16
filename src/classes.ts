abstract class Department {
  //   private id: string;
  //   private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;
  //   {
  //     console.log(`Department(${this.id}): ${this.name}`);
  //   }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID:", this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    } else {
      throw new Error("No report found");
    }
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please fill the valid value");
    }

    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment("d3", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID:", this.id);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// const accounting = new Department("d1", "Accounting");

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

// console.log(accounting === accounting2); // true
// console.log(accounting);

const emp1 = Department.createEmployee("John");
console.log(emp1);

const newDepartment = new ITDepartment("d2", ["Max"]);

newDepartment.addEmployee("Max");
newDepartment.addEmployee("Manu");

// accounting.employees[2] = "Anna";

newDepartment.describe();
newDepartment.printEmployeeInformation();

console.log(newDepartment);

// const accounting = new AccountingDepartment("d3", []);

// console.log(accounting.mostRecentReport);

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.describe();

accounting.addReport("Hello World");
accounting.mostRecentReport = "Year-end Report";

// accounting.printReports();
// console.log(accounting);

// console.log(accounting.mostRecentReport);
