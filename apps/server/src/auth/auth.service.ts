import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from './entities/refresh-token.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: EntityRepository<RefreshToken>,
  ) {}

  /**
   * Validate user for the local passport strategy
   *
   * @param email
   * @param pass
   * @returns
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    return (await this.validatePassword(user, pass)) ? user : null;
  }

  /**
   * Login user and return JWT token
   * @param user
   * @returns
   */
  async login(user: any) {
    const payload = { id: user.id, authService: 'password' };

    // const user = await this.usersService.findOneByEmail(payload.email);
    return { access_token: this.jwtService.sign(payload) };
  }

  // async signup(createUserDto: CreateUserDto): Promise<any> {
  //   const { email, password } = createUserDto;
  //   // const token = generateToken();

  //   return this.usersService.createUser(email, password);
  // }

  async validatePassword(user: User, password: string) {
    const userPassword = user?.password;
    const res = await compare(password, userPassword);

    return res;
  }

  async generateAccessToken(user: Pick<User, 'id'>) {
    const payload = { id: String(user.id) };
    return await this.jwtService.signAsync(payload);
  }

  async createRefreshToken(user: Pick<User, 'id'>, ttl: number) {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    const token = this.refreshTokenRepository.create({
      user,
      expires: expiration,
    });

    await this.refreshTokenRepository.persistAndFlush(token);

    return token;
  }

  async generateRefreshToken(user: Pick<User, 'id'>, expiresIn: number) {
    const payload = { sub: String(user.id) };
    const token = await this.createRefreshToken(user, expiresIn);
    return await this.jwtService.signAsync({
      ...payload,
      expiresIn,
      jwtId: String(token.id),
    });
  }

  async resolveRefreshToken(encoded: string) {
    try {
      const payload = await this.jwtService.verify(encoded);

      if (!payload.id || !payload.jwtId) {
        throw new UnprocessableEntityException('Refresh token malformed');
      }

      const token = await this.refreshTokenRepository.findOne({
        id: payload.jwtId,
      });

      if (!token) {
        throw new UnprocessableEntityException('Refresh token not found');
      }

      if (token.revoked) {
        throw new UnprocessableEntityException('Refresh token revoked');
      }

      const user = await this.usersService.findOne(payload.id);

      if (!user) {
        throw new UnprocessableEntityException('Refresh token malformed');
      }

      return { user, token };
    } catch (e) {
      // todo proper error handling
      throw new UnprocessableEntityException('Refresh token malformed');
    }
  }

  async createAccessTokenFromRefreshToken(refresh: string) {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  async register(email: string, pass: string) {
    let user = await this.usersService.findOneByEmail(email);
    if (user) {
      return null;
    }
    const hashed = await bcrypt.hash(pass, 10);
    user = await this.usersService.create({ email, password: hashed });
    return user;
  }
}
