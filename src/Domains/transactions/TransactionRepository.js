/* eslint-disable no-unused-vars */
class TransactionRepository {
  async addTransaction(addedTransaction) {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTransactionByUserId(idUser) {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateTransactionById(id) {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TransactionRepository;
