import { Jwt } from '@/domain/contracts/gateways';

export class JwtGateway implements Jwt {
  validate({ email, password }: Jwt.Input): Promise<Jwt.Output> {
    return;
  }
}
