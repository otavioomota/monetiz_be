import { Op } from 'sequelize';
import Address from '../models/Address';

class CreateAddressService {
  async execute({
    street,
    number,
    neighborhood,
    zip_code,
    city,
    state,
    additional,
  }) {
    const addressExists = await Address.findOne({
      where: {
        [Op.and]: [{ zip_code, number, additional }],
      },
    });

    if (addressExists) {
      return addressExists;
    }

    const address = await Address.create({
      street,
      number,
      neighborhood,
      zip_code,
      city,
      state,
      additional,
    });

    return address;
  }
}

export default CreateAddressService;
