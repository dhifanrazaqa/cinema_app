/* eslint-disable no-unused-vars */
class BalanceRepository {
  async addBalance(id) {
    throw new Error('BALANCE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getBalanceById(id) {
    throw new Error('BALANCE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateBalanceById({ id, newBalance }) {
    throw new Error('BALANCE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = BalanceRepository;
