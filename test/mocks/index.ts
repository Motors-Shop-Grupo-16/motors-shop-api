export const mockedErrorResponse = expect.objectContaining({
  statusCode: expect.any(Number),
  message: expect.any(String),
  error: expect.any(String),
});
