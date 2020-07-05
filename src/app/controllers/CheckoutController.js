import CreateAddressService from '../services/CreateAddressService';
import CreateUserService from '../services/CreateUserService';
import CreateCieloTransactionService from '../services/CreateCieloTransactionService';

class CheckoutController {
  async store(request, response) {
    try {
      const { address, user, cardOwnerData, creditCardData } = request.body;

      console.log(request.body);

      const createAddress = new CreateAddressService();
      const createUser = new CreateUserService();
      const createCieloTransaction = new CreateCieloTransactionService();

      console.log('1');
      const addressCreated = await createAddress.execute(address);

      console.log('2');
      await createUser.execute({
        name: user.name,
        address_id: addressCreated.id,
      });
      console.log('3');

      const cieloTransaction = await createCieloTransaction.execute({
        address,
        user,
        cardOwnerData,
        creditCardData,
      });
      console.log('4');

      return response.json(cieloTransaction);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new CheckoutController();
