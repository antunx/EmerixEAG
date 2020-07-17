export interface RtagetValidateUserModel {
  ErrorCode: number;
  ErrorMessage: string;
  IsValid: boolean;
  MessageValid: string;
  Person: string;
  IsExistsPhone: boolean;
  IsExistsMail: boolean;
  Phones: Phone[];
  Mails: Mail[];
}

export interface Phone {
  PhoneValue: string;
  Phone: string;
}

export interface Mail {
  MailValue: string;
  Mail: string;
}
