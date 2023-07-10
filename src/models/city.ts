module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      }
    });
  
    return City;
};