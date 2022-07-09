import mongoose, { Types } from 'mongoose';

export class UserSeed {
  async insertData() {
    const connection = mongoose.createConnection(process.env.DB_CONNECTION);

    const users = [
      {
        _id: new Types.ObjectId('111111111111111111111111'),
        username: 'username',
        firstName: 'first',
        password: 'something',
        lastName: 'last',
        documentNo: '44444444444',
        birthDate: '19/10/1991',
      },
    ];
    await connection.useDb('test').collection('users').insertMany(users);
  }

  async deleteData() {
    const connection = mongoose.createConnection(process.env.DB_CONNECTION);
    await connection.useDb('test').collection('users').deleteMany({});
  }
}
