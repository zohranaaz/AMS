import { Model, Sequelize, DataTypes } from 'sequelize';
export default class UserRoleMappings extends Model {
  public id?: number;
  public role_id?: number;
  public user_id?: number;
  public status?: number;
}
export const UserRoleMappingMap = (sequelize: Sequelize) => {
  UserRoleMappings.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'user_role_mappings',
    timestamps: false
  });
  UserRoleMappings.sync();
}