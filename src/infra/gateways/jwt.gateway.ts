import { Jwt } from '@/domain/contracts/gateways';
import jwt from 'jsonwebtoken';

export class JwtGateway implements Jwt {
  createAccessToken({ userId }: Jwt.Input): Jwt.Output {
    const accessToken = jwt.sign({ userId }, 'secret');
    return { accessToken };
  }
}
