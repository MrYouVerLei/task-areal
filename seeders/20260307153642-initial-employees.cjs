'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        last_name: 'Иванов',
        first_name: 'Иван',
        patronymic: 'Иванович',
        birth_date: '1993-10-23',
        passport: '7818 334477',
        phone: '+78005350812',
        address: 'г. Ярославль, пр-кт. Ленина, д.33',
        salary: 90000.00,
        hire_date: '2019-06-15',
        is_working: true,
        department_id: 1,
        position_id: 1
      },
      {
        last_name: 'Петров',
        first_name: 'Пётр',
        patronymic: 'Иванович',
        birth_date: '1997-03-14',
        passport: '7832 971904',
        phone: '+79110734189',
        address: 'г. Ярославль, ул. Светлая, д.5',
        salary: 70000.00,
        hire_date: '2022-11-06',
        is_working: true,
        department_id: 1,
        position_id: 1
      },
      {
        last_name: 'Слаков',
        first_name: 'Александ',
        patronymic: 'Денисович',
        birth_date: '2000-05-17',
        passport: '7856 521650',
        phone: '+79110875125',
        address: 'г. Ярославль, ул. Дорожная, д.21',
        salary: 65000.00,
        hire_date: '2023-02-18',
        is_working: true,
        department_id: 3,
        position_id: 4
      },
      {
        last_name: 'Новикова',
        first_name: 'Екатерина',
        patronymic: 'Андреевна',
        birth_date: '1998-08-02',
        passport: '7842 620816',
        phone: '+79459642504',
        address: 'г. Ярославль, ул. Добрынина, д.43',
        salary: 70000.00,
        hire_date: '2020-06-28',
        is_working: true,
        department_id: 4,
        position_id: 5
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
