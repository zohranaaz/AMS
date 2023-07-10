import { Model, Sequelize, DataTypes } from 'sequelize';
export default class Employees extends Model {
  public id?: number;
  public first_name?: string;
  public last_name?: string;
  public phone?: string;
  public designation? : string;
  public image?: string;
  public department?: string;
  public status? : number;
  public parent_id?: number;
  public user_id? : number;
  public base_path? : string;
}
export const EmployeeMap = (sequelize: Sequelize) => {
  Employees.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(255)
    },
    image: {
      type: DataTypes.STRING(255)
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    base_path: {
      type: DataTypes.STRING(255)
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false
  });
  Employees.sync();
}