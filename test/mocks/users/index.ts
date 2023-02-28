import { hashSync } from 'bcryptjs';

export const validMockedUser = {
  email: 'teste@gmail.com',
  password: hashSync('1234', 10),
  name: 'teste teste',
  cpf: '12312312312',
  phone: '12312312312',
  dateOfBirth: '1234-12-12',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: true,
};
