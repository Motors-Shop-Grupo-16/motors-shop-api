import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { LoginModule } from './routes/login/login.module';
import { ensureAuthMiddleware } from './middlewares/ensureAuth.middleware';
import { UsersController } from './routes/users/users.controller';
import { AnnouncementModule } from './routes/announcements/announcements.module';
import { AnnouncementController } from './routes/announcements/announcements.controller';
import { ensureIsAdvertiser } from './middlewares/ensureIsAdvertiser.middleware';

@Module({
  imports: [UsersModule, LoginModule, AnnouncementModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'announcements', method: RequestMethod.GET },
        { path: 'announcements/notAdvertiser/:id', method: RequestMethod.GET },
      )
      .forRoutes(UsersController, AnnouncementController);
    consumer
      .apply(ensureIsAdvertiser)
      .forRoutes(
        { path: 'announcements', method: RequestMethod.POST },
        'announcements/advertiser/',
      );
  }
}
