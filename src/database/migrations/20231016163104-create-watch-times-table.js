"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("watch_times", {
      seconds: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
      },
      episode_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "episodes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("watch_times");
  },
};
