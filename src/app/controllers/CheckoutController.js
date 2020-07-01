import CreateAddressService from '../services/CreateAddressService';
import CreateUserService from '../services/CreateUserService';

class CheckoutController {
  async store(request, response) {
    const { address, user } = request.body;

    const createAddress = new CreateAddressService();
    const createUser = new CreateUserService();

    const addressCreated = await createAddress.execute(address);

    const userCreated = await createUser.execute({
      name: user.name,
      address_id: addressCreated.id,
    });

    return response.json(addressCreated);
  }
}

export default new CheckoutController();
