import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ensureIsAdvertiser implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    if (!req.user.isAdvertiser) {
      throw new UnauthorizedException('Not an advertiser');
    }

    return next();
  }
}
