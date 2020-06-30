import CreateAddressService from '../services/CreateAddressService';

class CheckoutController {
  async store(request, response) {
    const { address } = request.body;

    console.log(address);

    const createAddress = new CreateAddressService();

    const addressCreated = await createAddress.execute(address);

    return response.json(addressCreated);
  }
}

export default new CheckoutController();
