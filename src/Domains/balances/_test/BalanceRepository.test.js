const BalanceRepository = require('../BalanceRepository');

describe('BalanceRepository Interface', () => {
  it('should throw error when invoke abstract behavior ', async () => {
    const movieRepository = new BalanceRepository();

    await expect(movieRepository.addBalance('')).rejects.toThrowError('BALANCE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(movieRepository.getBalanceById('')).rejects.toThrowError('BALANCE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(movieRepository.updateBalanceById({})).rejects.toThrowError('BALANCE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
