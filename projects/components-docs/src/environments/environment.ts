import { CREDENTIALS } from '@sinequa/core/login';

export const environment = {
  url: "https://localhost:4200",
  autoSAMLProvider: "identity-dev",
  production: false,
  mock: false,
  providers: [
    { provide: CREDENTIALS, useValue: { userName: '', password: '' } }
  ]
};