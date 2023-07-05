const ShowRepository = require('../ShowRepository');

describe('ShowRepository Interface', () => {
  it('should throw error when invoke abstract behavior ', async () => {
    const showRepository = new ShowRepository();

    await expect(showRepository.getShow('')).rejects.toThrowError('SHOW_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
