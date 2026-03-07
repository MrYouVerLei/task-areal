'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [
      { name: 'Отдел разработки' },
      { name: 'Бухгалтерия' },
      { name: 'Отдел тестирования' },
      { name: 'Отдел дизайна' },
      { name: 'Отдел аналитики' },
      { name: 'Маркетинг' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
