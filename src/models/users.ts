import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Model, Sequelize, DataTypes } from 'sequelize';
import { PrimaryKey } from 'sequelize-typescript';
export default class Users extends Model {
  public id?: number;
  public email?: string;
  public password?: string;
  public gender?: string;
  public user_name? : string;
  public status?: number;
}
export const UserMap = (sequelize: Sequelize) => {
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255)
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(255)
    },
    status: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false
  });
  Users.sync();
}