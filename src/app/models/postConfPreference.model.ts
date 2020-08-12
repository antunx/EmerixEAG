export interface CfgPreference {
    items: Item[];
    payer: Payer;
    payment_methods: Paymentmethods;
    back_urls: Backurls;
    auto_return: string;
    expires: boolean;
    external_reference: string;
    notification_url: string;
    expiration_date_from: string,
    expiration_date_to: string
  }
  
  interface Backurls {
    success: string;
    pending: string;
    failure: string;
  }
  
  interface Paymentmethods {
    default_payment_method_id: string,
    excluded_payment_methods: any[];
    excluded_payment_types: any[];
    installments: number;
    default_installments: number;
  }
  
  interface Payer {
    name: string;
    surname: string;
    email: string;
    phone: Phone;
    identification: Identification;
  }
  
  interface Identification {
    type: string;
    number: string;
  }
  
  interface Phone {
    area_code: string;
    number: string;
  }
  
  interface Item {
    id: string;
    title: string;
    description: string;
    currency_id: string;
    quantity: number;
    unit_price: number;
  }