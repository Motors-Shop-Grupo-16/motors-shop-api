import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { useContainer } from 'class-validator';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

import { validMockedUser } from './mocks/users';
import { mockedAddress } from './mocks/addresses';
import { mockedErrorResponse, mockedRequiredFieldsResponse } from './mocks';
import { mockedValidLoginBody } from './mocks/login';

describe('Integration Tests: Addresses Routes', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const address = await prisma.address.create({
      data: mockedAddress,
    });

    await prisma.user.create({
      data: { ...validMockedUser, addressId: address.id },
    } as any);

    await app.init();
  });

  describe('POST ---> /login', () => {
    it('Should not be able login without required fields', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/login')
        .send({});

      expect(status).toBe(400);
      expect(body).toStrictEqual(mockedRequiredFieldsResponse);
    });

    // it('Should be able update with success', async () => {
    //   const { body: loginBody } = await request(app.getHttpServer())
    //     .post('/login')
    //     .send(mockedValidLoginBody);

    //   const { body: userBody } = await request(app.getHttpServer())
    //     .get('/users')
    //     .set('Authorization', `Bearer ${loginBody.token}`);

    //   userBody.Address.road = mockedUpdateAddressBody.road;
    //   userBody.Address.User = { id: userBody.id, name: userBody.name };

    //   const { body, status } = await request(app.getHttpServer())
    //     .patch('/addresses')
    //     .send(mockedUpdateAddressBody)
    //     .set('Authorization', `Bearer ${loginBody.token}`);

    //   expect(status).toBe(200);
    //   expect(body).toStrictEqual(userBody.Address);
    // });
  });
});
