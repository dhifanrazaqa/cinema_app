class GetTransactionUseCase {
  constructor({ transactionRepository }) {
    this._transactionRepository = transactionRepository;
  }

  async execute(idUser) {
    return this._transactionRepository.getTransactionByUserId(idUser);
  }
}

module.exports = GetTransactionUseCase;
