class LogoutUserUseCase {
  async execute(request) {
    request.session.destroy();
  }
}

module.exports = LogoutUserUseCase;
