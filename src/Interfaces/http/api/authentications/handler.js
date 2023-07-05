const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationPageHandler(req, res) {
    return res.render('login', { error: '', req });
  }

  async postAuthenticationHandler(req, res, next) {
    try {
      console.log(req.body);
      const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
      await loginUserUseCase.execute(req, req.body);
      return res.redirect('../..');
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);
      if (translatedError instanceof InvariantError
        || translatedError instanceof AuthenticationError) {
        return res.render('login', { error: translatedError, req });
      }
      return next(error);
    }
  }

  async deleteAuthenticationHandler(req, res) {
    const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(req);
    return res.redirect('/');
  }
}

module.exports = AuthenticationsHandler;
