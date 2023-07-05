class UpdateTransactionUseCase {
  constructor({ transactionRepository }) {
    this._transactionRepository = transactionRepository;
  }

  async execute(useCasePayload) {
    const { id } = useCasePayload;
    return this._transactionRepository.updateTransactionById(id);
  }
}

module.exports = UpdateTransactionUseCase;
