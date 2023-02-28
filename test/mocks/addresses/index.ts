export const mockedAddress = {
  cep: '1233456',
  state: 'Teste Teste',
  city: 'Teste Teste',
  road: 'Teste 123',
  number: '123',
};

export const mockedUpdateAddressBody = {
  road: '123 Teste',
};

export const mockedAddressResponse = expect.objectContaining({
  id: expect.any(String),
  cep: expect.any(String),
  state: expect.any(String),
  city: expect.any(String),
  road: expect.any(String),
  number: expect.any(String),
  complement: expect.any(String || null),
  User: expect.objectContaining({
    id: expect.any(String),
  }),
});
