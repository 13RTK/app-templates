export default class Employee {
  name: string;
  country: string;
  role: string;
  department: string;
  company: string;
  avatar: string;

  constructor(
    name: string,
    country: string,
    role: string,
    department: string,
    company: string,
    avatar: string
  ) {
    this.name = name;
    this.country = country;
    this.role = role;
    this.department = department;
    this.company = company;
    this.avatar = avatar;
  }
}
