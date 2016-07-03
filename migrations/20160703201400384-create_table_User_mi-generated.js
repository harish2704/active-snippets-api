/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull : false,
      },

      username: {
        type: Sequelize.STRING,
        allowNull : false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull : false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull : true,
      },

      emailToken: {
        type: Sequelize.STRING,
        allowNull : true,
      },

      isSelfVerified: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false,
      },

      isAdminVerified: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull : false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull : false,
      },

    })
    .then( function(){
      return queryInterface.addIndex(
        'Users',
        ["id"],
        {
          indexName: 'Users_id_unique',
          indicesType: 'UNIQUE'
        }
      )
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable( 'Users' );
  }
};

