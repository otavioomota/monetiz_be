import User from '../models/User';

class CreateUserService {
  async execute({ name, address_id }) {
    const userExists = await User.findOne({
      where: { name },
    });

    if (userExists) {
      return userExists;
    }

    const user = await User.create({
      name,
      address_id,
    });

    return user;
  }
}

export default CreateUserService;
