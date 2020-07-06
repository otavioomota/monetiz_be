import api from '../../services/api';

class ListAllCieloTransactionsService {
  async execute() {
    const response = await api({
      method: 'get',
      url: `${process.env.cieloListPaymentURL}/1/sales?merchantOrderId=${process.env.merchantOrderId}`,
      headers: {
        MerchantId: `${process.env.merchantID}`,
        MerchantKey: `${process.env.merchantKey}`,
      },
    });

    const paymentsIds = response.data.Payments;

    async function loadingPaymentsData() {
      const paymentsDataResponse = paymentsIds.map(async (payment) => {
        const responsePayment = await api({
          method: 'get',
          url: `${process.env.cieloListPaymentURL}/1/sales/${payment.PaymentId}`,
          headers: {
            MerchantId: `${process.env.merchantID}`,
            MerchantKey: `${process.env.merchantKey}`,
          },
        });
        return responsePayment.data;
      });

      const paymentsData = await Promise.all(paymentsDataResponse);

      return paymentsData;
    }

    const payments = await loadingPaymentsData();

    return payments;
  }
}

export default ListAllCieloTransactionsService;
