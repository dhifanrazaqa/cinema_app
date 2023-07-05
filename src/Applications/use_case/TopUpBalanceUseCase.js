class TopUpBalanceUseCase {
  constructor({ balanceRepository }) {
    this._balanceRepository = balanceRepository;
  }

  async execute(useCasePayload) {
    useCasePayload.newBalance = parseInt(useCasePayload.newBalance, 10);
    return this._balanceRepository.updateBalanceById(useCasePayload);
  }
}

module.exports = TopUpBalanceUseCase;
