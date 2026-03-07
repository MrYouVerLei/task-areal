'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('positions', [
      { name: 'Разработчик' },
      { name: 'Старший разработчик' },
      { name: 'Бухгалтер' },
      { name: 'Тестировщик' },
      { name: 'UI/UX дизайнер' },
      { name: 'Аналитик' },
      { name: 'Руководитель' },
      { name: 'Менеджер по продажам' },
      { name: 'Менеджер проекта' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {});
  }
};
