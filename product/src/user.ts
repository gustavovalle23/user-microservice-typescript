import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  cpf: string;
  password: string;
  birthDate: string;
}

export interface UserById {
  id: string;
}

export interface UserService {
  FindOne(data: UserById): Observable<User>;
}
