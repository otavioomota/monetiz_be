import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Address from '../app/models/Address';
import Transaction from '../app/models/Transaction';
import User from '../app/models/User';

const models = [Address, Transaction, User];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
