export const JWT_SERVICE = 'JwtService';

export namespace Jwt {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}

export interface Jwt {
  validate(input: Jwt.Input): Jwt.Output;
}
