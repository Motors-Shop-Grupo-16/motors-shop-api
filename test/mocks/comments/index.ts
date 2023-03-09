/* eslint-disable prettier/prettier */
import 'jest-extended';

export const validMockedComment = {
  user: 'teste@gmail.com',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
};

export const mockedUserComment = {
  email: 'teste@mail.com',
  password: '12345',
  confirmPassword: '12345',
  name: 'teste',
  cpf: '12345678978',
  phone: '11111112222',
  dateOfBirth: '1459-01-01',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: true,
  address: {
    cep: '00000',
    city: 'juacity',
    state: 'ce',
    number: '123',
    road: 'teste',
  },
};

export const mockedUserCommentLogin = {
  email: 'teste@mail.com',
  password: '12345',
};

export const mockedUserNotComment = {
  email: 'test1@mail.com',
  password: '12345',
  confirmPassword: '12345',
  name: 'teste',
  cpf: '12356878998',
  phone: '111111333333',
  dateOfBirth: '2000-02-11',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: false,
  address: {
    cep: '00000',
    city: 'juacity',
    state: 'ce',
    number: '123',
    road: 'teste',
  },
};

export const mockedUserNotCommentLogin = {
  email: 'test@mail.com',
  password: '12345',
};

export const voidComment = {};

export const voidCommentErrorResponse = expect.objectContaining({
  statusCode: expect.any(Number),
  message: expect.arrayContaining([expect.any(String)]),
  error: expect.any(String),
});

export const updateCommentData = {
  user: 'teste@gmail.com',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
};
