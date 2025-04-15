declare interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  number: string;
  email: string;
}

declare interface LoginForm {
  email: string;
  password: string;
}

declare interface RegistrationForm {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  password: string;
  confirmPassword: string;
}
