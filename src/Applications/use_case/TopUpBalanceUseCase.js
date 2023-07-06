const InvariantError = require('../../Commons/exceptions/InvariantError');

class TopUpBalanceUseCase {
  constructor({ balanceRepository }) {
    this._balanceRepository = balanceRepository;
  }

  async execute(useCasePayload) {
    useCasePayload.newBalance = parseInt(useCasePayload.newBalance, 10);
    const { newBalance, id } = useCasePayload;
    const curBalance = await this._balanceRepository.getBalanceById(id);

    if (newBalance <= 0 && Math.abs(newBalance) <= curBalance) {
      return this._balanceRepository.updateBalanceById(useCasePayload);
    }
    if (newBalance >= 0) {
      return this._balanceRepository.updateBalanceById(useCasePayload);
    }
    throw new InvariantError('Bad Request');
  }
}

module.exports = TopUpBalanceUseCase;
