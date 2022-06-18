'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [{
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 4.40,
        delivery_address: '',
        delivery_number: '',
        status: ''
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 37.50,
        delivery_address: '',
        delivery_number: '',
        status: ''
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
