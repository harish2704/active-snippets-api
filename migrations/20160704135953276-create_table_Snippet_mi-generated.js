/* This file is auto-generated using https://github.com/harish2704/sequelize-migration-generator. */

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Snippets', {
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

      template: {
        type: Sequelize.TEXT,
        allowNull : false,
      },

      schema: {
        type: Sequelize.TEXT,
        allowNull : false,
      },

      syntax: {
        type: Sequelize.ENUM( "apache_conf","assembly_x86","batchfile","c_cpp","css","diff","gitignore","golang","html","ini","java","javascript","json","jsx","less","markdown","mysql","objectivec","perl","php","plain_text","python","ruby","sass","scss","sh","sql","xml","yaml" ),
        defaultValue:'plain_text',
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
        'Snippets',
        ["id"],
        {
          indexName: 'Snippets_id_unique',
          indicesType: 'UNIQUE'
        }
      )
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable( 'Snippets' );
  }
};

