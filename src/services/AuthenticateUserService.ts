import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    // user.password -- Senha criptografada (Salva do BD)
    // password - Senha não criptografada (Senha que tentou fazer o login)

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, 'c6da1619d976e818e6a6178a813c26c7', {
      subject: user.id,
      expiresIn: '1d',
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
