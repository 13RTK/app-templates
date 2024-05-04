import { faker } from '@faker-js/faker';

export function getFakeAvatar() {
  return faker.image.avatar();
}

function getFakeName() {
  return faker.person.fullName();
}

function getFakeCountry() {
  return faker.location.country();
}

function getFakeRole() {
  return faker.person.jobTitle();
}

function getFakeDepartment() {
  return faker.commerce.department();
}

function getFakeCompany() {
  return faker.company.name();
}

export function getFakeEmployee() {
  return {
    name: getFakeName(),
    country: getFakeCountry(),
    avatar: getFakeAvatar(),
    role: getFakeRole(),
    department: getFakeDepartment(),
    company: getFakeCompany(),
  };
}
