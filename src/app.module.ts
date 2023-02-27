import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { LoginModule } from './routes/login/login.module';
import { ensureAuthMiddleware } from './middlewares/ensureAuth.middleware';
import { UsersController } from './routes/users/users.controller';
import { AnnouncementModule } from './routes/announcements/announcements.module';
import { AnnouncementController } from './routes/announcements/announcements.controller';
import { ensureIsAdvertiser } from './middlewares/ensureIsAdvertiser.middleware';
import { AddressesModule } from './routes/addresses/addresses.module';
import { AddressesController } from './routes/addresses/addresses.controller';

@Module({
  imports: [LoginModule, UsersModule, AddressesModule, AnnouncementModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes(UsersController, AddressesController);
    consumer
      .apply(ensureAuthMiddleware, ensureIsAdvertiser)
      .exclude(
        { path: 'announcements', method: RequestMethod.GET },
        { path: 'announcements/:id', method: RequestMethod.GET },
        { path: 'announcements/advertiser/:id', method: RequestMethod.GET },
      )
      .forRoutes(AnnouncementController);
  }
}
