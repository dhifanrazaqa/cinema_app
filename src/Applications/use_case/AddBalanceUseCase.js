class AddBalanceUseCase {
  constructor({ balanceRepository }) {
    this._balanceRepository = balanceRepository;
  }

  async execute(idUser) {
    return this._balanceRepository.addBalance(idUser);
  }
}

module.exports = AddBalanceUseCase;
