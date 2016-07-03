/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      sid: {
        type: Sequelize.STRING,
        primaryKey : true,
      },

      data: {
        type: Sequelize.TEXT,
      },

      expires: {
        type: Sequelize.DATE,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull : false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull : false,
      },

      UserId: {
        type: Sequelize.INTEGER,
        references: {"model":"Users","key":"id"},
        allowNull : true,
        onDelete : 'SET NULL',
        onUpdate : 'CASCADE',
      },

    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable( 'Sessions' );
  }
};

