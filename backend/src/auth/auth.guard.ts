import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const checkJwt = auth({
      audience: process.env.AUTH0_AUDIENCE,
      issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    });

    try {
      // Convert middleware to promise
      await new Promise((resolve, reject) => {
        checkJwt(req, { end: () => {} } as any, (err) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      });
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
