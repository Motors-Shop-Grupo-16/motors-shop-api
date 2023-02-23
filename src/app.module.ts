import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { LoginModule } from './routes/login/login.module';
import { ensureAuthMiddleware } from './middlewares/ensureAuth.middleware';
import { UsersController } from './routes/users/users.controller';
import { AnnouncementModule } from './routes/announcement/announcement.module';
import { AnnouncementController } from './routes/announcement/announcement.controller';
import { isAdvertiser } from './middlewares/isAdvertiser.middleware';

@Module({
  imports: [UsersModule, LoginModule, AnnouncementModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes(UsersController);
    consumer
      .apply(ensureAuthMiddleware, isAdvertiser)
      .exclude(
        { path: 'announcements', method: RequestMethod.GET },
        { path: 'announcements/notAdvertiser/:id', method: RequestMethod.GET },
      )
      .forRoutes(AnnouncementController);
  }
}
