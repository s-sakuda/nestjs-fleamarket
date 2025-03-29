import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwtPayload';
import { RequestUser } from './types/requestUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    // リクエストからJWTを取り出し、検証するための設定
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // リクエストに含まれるJWTの格納場所を指定。Bearerトークンを使用する場合は、Authorizationヘッダーに格納されるため、fromAuthHeaderAsBearerToken()を指定
      ignoreExpiration: false, // 有効期限の検証を行うかどうかを指定。trueの場合、有効期限の検証を行わない
      secretOrKey: process.env.JWT_SECRET ?? '', // JWTの署名に使用するシークレットキーを指定。トークンが改ざんされていないかを検証するために使用
    });
  }

  // 親クラスのコンストラクタで、JWTの検証が成功した場合、ユーザー情報を返す
  validate(payload: JwtPayload): RequestUser {
    return {
      id: payload.sub,
      username: payload.username,
      status: payload.status,
    };
  }
}
