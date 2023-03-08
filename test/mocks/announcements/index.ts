export const mockedAnnouncement = {
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
  images: [
    {
      url: 'https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/04-images/novo-onix-branco-summit.png?imwidth=960',
    },
  ],
};

export const mockedUpdateAnnouncement = {
  title: 'Teste update',
  typeSale: 'sale',
  year: '1234',
  mileage: '123',
  price: '1.234,00',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...',
  typeVehicle: 'car',
  coverImage:
    'https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/04-images/novo-onix-branco-summit.png?imwidth=960',
  images: [
    {
      url: 'https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/04-images/novo-onix-branco-summit.png?imwidth=960',
    },
  ],
};

export const mockedUserAdvertiser = {
  email: 'advertiser@mail.com',
  password: '1234',
  confirmPassword: '1234',
  name: 'teste teste',
  cpf: '12313697312',
  phone: '12312312312',
  dateOfBirth: '1234-12-12',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: true,
  address: {
    cep: '00000',
    city: 'recife',
    state: 'pernambuco',
    number: '526',
    road: 'qualquer',
  },
};

export const mockedUserAdvertiserLogin = {
  email: 'advertiser@mail.com',
  password: '1234',
};

export const mockedUserNotAdvertiser = {
  email: 'user1@mail.com',
  password: '1234',
  confirmPassword: '1234',
  name: 'teste teste',
  cpf: '1235687312',
  phone: '12312312312',
  dateOfBirth: '1234-12-12',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut ipsum vel quam congue malesuada. Proin posuere ligula in odio lobortis, et tempus dui dignissim.',
  isAdvertiser: false,
  address: {
    cep: '00000',
    city: 'recife',
    state: 'pernambuco',
    number: '526',
    road: 'qualquer',
  },
};

export const mockedUserNotAdvertiserLogin = {
  email: 'user1@mail.com',
  password: '1234',
};
