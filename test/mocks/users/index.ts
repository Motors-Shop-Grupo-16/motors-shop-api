import { hashSync } from 'bcryptjs';

export const validMockedUser = {
  email: 'teste@gmail.com',
  password: hashSync('1234', 10),
  name: 'teste teste',
  cpf: '12312312312',
  phone: '12312312312',
  dateOfBirth: new Date('1234-12-12'),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: true,
};

export const userCreation = {
  email: 'teste3@gmail.com',
  password: '1234',
  name: 'teste3 da silva',
  dateOfBirth: '1988-02-02',
  cpf: '3',
  phone: '3',
  isAdvertiser: true,
  address: {
    cep: '00000',
    city: 'recife',
    state: 'pernambuco',
    number: '526',
    road: 'qualquer',
  },
};
