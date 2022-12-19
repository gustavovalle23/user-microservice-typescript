import { Types } from 'mongoose';

export const users = [
  {
    _id: new Types.ObjectId('111111111111111111111111'),
    birthDate: new Date('1999-10-02'),
    cpf: '111111111',
    email: 'email@email.com',
    name: 'Teste',
    isActive: true,
    password: 'fakepassword',
    role: 'admin',
  },
];
