/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
      },

      sid: {
        type: Sequelize.STRING,
        allowNull : false,
      },

      data: {
        type: Sequelize.TEXT,
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

    })
    .then( function(){
      return queryInterface.addIndex(
        'Sessions',
        ["sid"],
        {
          indexName: 'Sessions_sid_unique',
          indicesType: 'UNIQUE'
        }
      );
    })
    .then( function(){
      return queryInterface.addIndex(
        'Sessions',
        ["id"],
        {
          indexName: 'Sessions_id_unique',
          indicesType: 'UNIQUE'
        }
      )
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable( 'Sessions' );
  }
};

