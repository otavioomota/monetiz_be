import CreateAddressService from '../services/CreateAddressService';
import CreateUserService from '../services/CreateUserService';
import CreateCieloTransactionService from '../services/CreateCieloTransactionService';

class CheckoutController {
  async store(request, response) {
    try {
      const { address, user, cardOwnerData, creditCardData } = request.body;

      const createAddress = new CreateAddressService();
      const createUser = new CreateUserService();
      const createCieloTransaction = new CreateCieloTransactionService();

      const addressCreated = await createAddress.execute(address);

      await createUser.execute({
        name: user.name,
        address_id: addressCreated.id,
      });

      const cieloTransaction = await createCieloTransaction.execute({
        address,
        user,
        cardOwnerData,
        creditCardData,
      });

      return response.json(cieloTransaction);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new CheckoutController();
