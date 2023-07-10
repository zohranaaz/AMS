const db = require("../models");
const Address = db.addresses;
const multer = require('multer')
import User, { UserMap } from '../models/users';
import Employee, { EmployeeMap } from '../models/employees';
import database from '../models/index';
import config from '../config';
import UserRoleMappings, { UserRoleMappingMap } from '../models/userRoleMappings';
const { QueryTypes } = require('sequelize');

export class UserService {

  constructor() {
  }

  async addEmployee(req, user_id) {
    const employee = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      designation: req.body.designation,
      department: req.body.department,
      status: 1,
      parent_id: parseInt(req.body.parent_id),
      user_id: user_id,
      image: req.file.filename,
      base_path: config.imageBaseUrl
    };

    await this.addUserRoleMapping(req, user_id);
    EmployeeMap(database);
    return await Employee.create(employee);
  }

  async addUserRoleMapping(req, user_id) {
    const role_id = req.body.role_id;
    for (let indx in role_id) {
      const roleObj = {
        role_id: role_id[indx],
        user_id: user_id,
        status: 1
      }

      UserRoleMappingMap(database);
      await UserRoleMappings.create(roleObj);
    }
  }

  // addAddress = async (req, emp_id) => {

  //   const address = {
  //     street1: req.body.address.street1,
  //     street2: req.body.address.street2,
  //     country: req.body.address.country,
  //     city: req.body.address.city,
  //     pincode: req.body.address.pincode,
  //     state: req.body.address.state,
  //     status: req.body.address.status,
  //     emp_id: emp_id
  //   };

  //   const addressData = await Address.create(address)
  //   return addressData;
  // }

  async createUser(user) {
    UserMap(database);
    return await User.create(user);
  }

  async updateUser(uerName, userId) {
    UserMap(database);
    return await User.update({ user_name: uerName }, { where: { id: userId } });
  }

  async getUser(email) {
    UserMap(database);
    return await User.findOne({ where: { email: email } });
  }

  async getUserByUserName(user_name) {
    UserMap(database);
    return await User.findOne({ where: { user_name: user_name } });
  }

  async getUserById(id) {
    UserMap(database);
    return await User.findOne({ where: { id: id } });
  }

  async deleteUser(id) {
    UserMap(database);
    return await User.destroy({ where: { id: id } });
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

export default new UserService();