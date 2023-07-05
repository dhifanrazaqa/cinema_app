const UserLogin = require('../../Domains/users/entities/UserLogin');

class LoginUserUseCase {
  constructor({
    userRepository,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(request, useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByUsername(username);

    const { session } = request;
    session.userid = id;
    session.username = username;
    return session;
  }
}

module.exports = LoginUserUseCase;
