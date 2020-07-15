export interface RtagetValidateUserModel {
  ErrorCode: number;
  ErrorMessage: string;
  IsValid: boolean;
  MessageValid: string;
  PersonId: string;
  Person: string;        // actualmente esta viniendo el id_persona, deberia ser nombre-apellido, id arriba
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
