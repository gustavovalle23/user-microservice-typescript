export type CreateUserOutput = {
  user: {
    id: string;
    cpf: string;
    name: string;
    email: string;
    isActive: boolean;
    birthDate: Date;
  };
  accessToken: string;
};
