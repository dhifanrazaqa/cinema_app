class GetUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(idUser) {
    return this._userRepository.getUser(idUser);
  }
}

module.exports = GetUserUseCase;
