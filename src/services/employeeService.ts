const db = require("../models");
import User, { UserMap } from '../models/users';
import Employee, { EmployeeMap } from '../models/employees';
import database from '../models/index';
const { QueryTypes } = require('sequelize');

export class EmployeeService {

  constructor() {
  }

  async createEmployee(emp) {
    EmployeeMap(database);
    return await Employee.create(emp);
  }


  async getEmployeeByUserId(userId) {
    EmployeeMap(database);
    return await Employee.findOne({ where: { user_id: userId } });
  }

  async findAllEmployee() {
    EmployeeMap(database);
    return await Employee.findAll({});
  }

  async deleteEmployee(id) {
    EmployeeMap(database);
    return await Employee.destroy({ where: { user_id: id } });
  }

  async getAllUser() {
    const query = `SELECT users.email, employees.first_name, employees.last_name, employees.base_path, employees.image from users INNER JOIN employees ON users.Id = employees.user_id`
    return await database.query(query, {
      type: QueryTypes.SELECT
    });
  }

  async getUserDetailById(user_id) {
    const query = `SELECT roles.role_name from roles INNER JOIN user_role_mappings ON roles.Id = user_role_mappings.role_id WHERE user_role_mappings.user_id=${user_id}`
    return await database.query(query, {
      type: QueryTypes.SELECT
    });
  }
}

export default new EmployeeService();