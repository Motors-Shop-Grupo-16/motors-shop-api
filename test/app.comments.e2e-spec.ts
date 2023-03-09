/* eslint-disable prettier/prettier */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { mockedErrorResponse, mockedRequiredFieldsResponse } from './mocks';
import {
  mockedUserComment,
  mockedUserCommentLogin,
  mockedUserNotComment,
  mockedUserNotCommentLogin,
  validMockedComment,
  voidCommentErrorResponse,
} from './mocks/comments';

describe('Integration Tests: Comments Routes', () => {
  let app: INestApplication;

  let commentToken = '';
  let notcommentToken = '';
  let commentId = '';
  let commentCreatedId = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    const user = await request(app.getHttpServer())
      .post('/users')
      .send(mockedUserComment);
    const { body } = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUserCommentLogin);
    commentToken = body.token;
    commentId = user.body.id;

    await request(app.getHttpServer())
      .post('/users')
      .send(mockedUserNotComment);
    const notcomment = await request(app.getHttpServer())
      .post('/login')
      .send(mockedUserNotCommentLogin);
    notcommentToken = notcomment.body.token;
  });

  describe('POST ---> /users/comments', () => {
    it('Should not be able to create a comment without authorization token', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/comments')
        .send(validMockedComment);
      expect(status).toBe(401);
      expect(body).toStrictEqual(voidCommentErrorResponse);
    });
  });

  it('All fields have to be filled in', async () => {
    const data = validMockedComment;
    const { status, body } = await request(app.getHttpServer())
      .post('/comments')
      .send(data)
      .set('Authorization', `Bearer ${commentToken}`);
    expect(status).toBe(400);
    expect(body).toStrictEqual(mockedRequiredFieldsResponse);
  });

  it('Should be able create with success', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/comments')
      .send(validMockedComment)
      .set('Authorization', `Bearer ${commentToken}`);
    commentCreatedId = body.id;
    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('user');
    expect(body).toHaveProperty('content');
  });
});

describe('GET ---> /users/comments', () => {
  it('It should not be possible to get a comment with invalid id', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `/users/comments/${'invalidId'}`,
    );
    expect(status).toBe(404);
    expect(body).toStrictEqual(mockedErrorResponse);
  });
});

it('Must be able to create a comment', async () => {
  const { status, body } = await request(app.getHttpServer()).get(
    `/users/comments/${commentCreatedId}`,
  );
  expect(status).toBe(200);
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('user');
  expect(body).toHaveProperty('content');
});

it('Must be able to get all comments', async () => {
  const { status, body } = await request(app.getHttpServer()).get(
    `/users/comments/`,
  );
  expect(status).toBe(200);
  expect(body[0]).toHaveProperty('id');
  expect(body[0]).toHaveProperty('user');
  expect(body[0]).toHaveProperty('content');
});

describe('PATCH ---> /users/comments', () => {
  it('Should not be able update without authorization token', async () => {
    const { status, body } = await request(app.getHttpServer())
      .patch(`/users/comments/${commentCreatedId}`)
      .send(validMockedComment);
    expect(status).toBe(401);
    expect(body).toStrictEqual(mockedErrorResponse);
  });
});

it('Should be able update with success', async () => {
  const { status } = await request(app.getHttpServer())
    .post('/users/comments')
    .send(validMockedComment)
    .set('Authorization', `Bearer ${commentToken}`);
  expect(status).toBe(201);
});

describe('Delete ---> /users/comments', () => {
  it('It should not be possible to delete the comment with invalid id', async () => {
    const { status, body } = await request(app.getHttpServer())
      .delete(`/users/comments/${'invalidId'}`)
      .set('Authorization', `Bearer ${commentToken}`);
    expect(status).toBe(404);
    expect(body).toStrictEqual(mockedErrorResponse);
  });

  it('Must be able to delete comment', async () => {
    const { status } = await request(app.getHttpServer())
      .delete(`/users/comments/${commentCreatedId}`)
      .set('Authorization', `Bearer ${commentToken}`);
    expect(status).toBe(204);
  });

  it('It should not be possible to delete a comment', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      `/users/comments/${commentCreatedId}`,
    );
    expect(status).toBe(404);
    expect(body).toStrictEqual(mockedErrorResponse);
  });
});
