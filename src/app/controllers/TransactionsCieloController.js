import ListAllCieloTransactionsService from '../services/ListAllCieloTransactionsService';

class TransactionsCieloController {
  async index(request, response) {
    const listAllCieloTransactions = new ListAllCieloTransactionsService();

    const cieloTransations = await listAllCieloTransactions.execute();

    return response.json(cieloTransations);
  }
}

export default new TransactionsCieloController();
