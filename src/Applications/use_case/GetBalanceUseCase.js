class GetBalanceUseCase {
  constructor({ balanceRepository }) {
    this._balanceRepository = balanceRepository;
  }

  async execute(idUser) {
    return this._balanceRepository.getBalanceById(idUser);
  }
}

module.exports = GetBalanceUseCase;
