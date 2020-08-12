export interface Preference {
    additional_info: string;
    auto_return: string;
    back_urls: Backurls;
    binary_mode: boolean;
    client_id: string;
    collector_id: number;
    coupon_code?: any;
    coupon_labels?: any;
    date_created: string;
    date_of_expiration?: any;
    expiration_date_from?: any;
    expiration_date_to?: any;
    expires: boolean;
    external_reference: string;
    id: string;
    init_point: string;
    internal_metadata?: any;
    items: Item[];
    marketplace: string;
    marketplace_fee: number;
    metadata: Metadata;
    notification_url: string;
    operation_type: string;
    payer: Payer;
    payment_methods: Paymentmethods;
    processing_modes?: any;
    product_id?: any;
    redirect_urls: Backurls;
    sandbox_init_point: string;
    site_id: string;
    shipments: Shipments;
    total_amount?: any;
    last_updated?: any;
  }
  
  interface Shipments {
    default_shipping_method?: any;
    receiver_address: Receiveraddress;
  }
  
  interface Receiveraddress {
    zip_code: string;
    street_name: string;
    street_number?: any;
    floor: string;
    apartment: string;
    city_name?: any;
    state_name?: any;
    country_name?: any;
  }
  
  interface Paymentmethods {
    default_card_id?: any;
    default_payment_method_id?: any;
    excluded_payment_methods: Excludedpaymentmethod[];
    excluded_payment_types: Excludedpaymentmethod[];
    installments: number;
    default_installments: number;
  }
  
  interface Excludedpaymentmethod {
    id: string;
  }
  
  interface Payer {
    phone: Phone;
    address: Address;
    email: string;
    identification: Identification;
    name: string;
    surname: string;
    date_created?: any;
    last_purchase?: any;
  }
  
  interface Identification {
    number: string;
    type: string;
  }
  
  interface Address {
    zip_code: string;
    street_name: string;
    street_number?: any;
  }
  
  interface Phone {
    area_code: string;
    number: string;
  }
  
  interface Metadata {
  }
  
  interface Item {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    title: string;
    quantity: number;
    unit_price: number;
  }
  
  interface Backurls {
    failure: string;
    pending: string;
    success: string;
  }