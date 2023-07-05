const InvariantError = require('../../Commons/exceptions/InvariantError');

class AddTransactionUseCase {
  constructor({ transactionRepository, balanceRepository }) {
    this._transactionRepository = transactionRepository;
    this._balanceRepository = balanceRepository;
  }

  async execute(addedTransaction) {
    addedTransaction.idMovie = parseInt(addedTransaction.idMovie, 10);

    const balance = await this._balanceRepository.getBalanceById(addedTransaction.idUser);

    if (balance > addedTransaction.totalPrice) {
      return this._transactionRepository.addTransaction(addedTransaction);
    }
    throw new InvariantError('Not Enough Balance!');
  }
}

module.exports = AddTransactionUseCase;
