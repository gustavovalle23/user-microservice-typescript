export const JWT_SERVICE = 'JwtService';

export namespace Jwt {
  export type Input = {
    userId: string;
  };
  export type Output = {
    accessToken: string;
  };
}

export interface Jwt {
  createAccessToken(input: Jwt.Input): Jwt.Output;
}
