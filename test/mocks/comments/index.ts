import { hashSync } from 'bcryptjs';

export const mockedCommentBody = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
};

export const updateCommentBody = {
  content: 'a',
};

export const mockedUserComment1 = {
  email: 'testeComment1@gmail.com',
  password: hashSync('1234', 10),
  name: 'teste teste',
  cpf: '12112112112',
  phone: '12312312312',
  dateOfBirth: new Date('1234-12-12'),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: true,
};

export const mockedUserComment2 = {
  email: 'testeComment2@gmail.com',
  password: hashSync('1234', 10),
  name: 'teste teste',
  cpf: '12112112113',
  phone: '12312312312',
  dateOfBirth: new Date('1234-12-12'),
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: true,
};

export const mockedUserCommentLogin1 = {
  email: 'testeComment1@gmail.com',
  password: '1234',
};
export const mockedUserCommentLogin2 = {
  email: 'testeComment2@gmail.com',
  password: '1234',
};

export const mockedAnnouncementComment = {
  title: 'Teste',
  typeSale: 'sale',
  year: '1234',
  mileage: '123',
  price: '1.234,00',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
  typeVehicle: 'car',
  coverImage:
    'https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/04-images/novo-onix-branco-summit.png?imwidth=960',
};

export const mockedImageComment = {
  url: 'https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/04-images/novo-onix-branco-summit.png?imwidth=960',
};

export const mockedComment = expect.objectContaining({
  id: expect.any(String),
  content: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  announcementId: expect.any(String),
  userId: expect.any(String),
});
