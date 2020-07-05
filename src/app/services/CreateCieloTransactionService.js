import api from '../../services/api';

class CreateCieloTransactionService {
  async execute({ address, user, cardOwnerData, creditCardData }) {
    const { street, number, additional, zip_code, city, state } = address;
    const { name } = user;
    const { email, bithdate } = cardOwnerData;
    const {
      cc_number,
      cc_holder,
      cc_validity,
      cc_cvc,
      cc_brand,
      price,
    } = creditCardData;

    const cieloObjectData = {
      MerchantOrderId: '2014111701',
      Customer: {
        Name: name,
        Email: email,
        Birthdate: bithdate,
        Address: {
          Street: street,
          Number: number,
          Complement: additional,
          ZipCode: zip_code,
          City: city,
          State: state,
          Country: 'BRA',
        },
        DeliveryAddress: {
          Street: street,
          Number: number,
          Complement: additional,
          ZipCode: zip_code,
          City: city,
          State: state,
          Country: 'BRA',
        },
      },
      Payment: {
        Currency: 'BRL',
        Country: 'BRA',
        ServiceTaxAmount: 0,
        Installments: 1,
        Interest: 'ByMerchant',
        Capture: true,
        Authenticate: false,
        SoftDescriptor: '123456789ABCD',
        CreditCard: {
          CardNumber: cc_number,
          Holder: cc_holder,
          ExpirationDate: cc_validity,
          SecurityCode: cc_cvc,
          SaveCard: 'false',
          Brand: cc_brand,
          CardOnFile: {
            Usage: 'Used',
            Reason: 'Unscheduled',
          },
        },
        IsCryptoCurrencyNegotiation: true,
        Type: 'CreditCard',
        Amount: price,
        AirlineData: {
          TicketNumber: 'AR988983',
        },
      },
    };
    const response = await api({
      method: 'post',
      url: `${process.env.cieloCreateTransactionURL}/1/sales`,
      data: cieloObjectData,
      headers: {
        MerchantId: `${process.env.merchantID}`,
        MerchantKey: `${process.env.merchantKey}`,
      },
    });

    return response.data;
  }
}

export default CreateCieloTransactionService;
