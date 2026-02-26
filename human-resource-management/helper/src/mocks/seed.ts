import { getFakeEmployee } from '@/utils/employeeHelper';
import { employeeCollection } from './collections/employees';

const EMPLOYEE_COUNT = 10;
export default async function () {
  await employeeCollection.createMany(EMPLOYEE_COUNT, () => getFakeEmployee());
}
