const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');
const AddBalanceUseCase = require('../../../../Applications/use_case/AddBalanceUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.postUserPageHandler = this.postUserPageHandler.bind(this);
  }

  async postUserHandler(req, res, next) {
    try {
      console.log(req.body);
      const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
      const addBalanceUseCase = this._container.getInstance(AddBalanceUseCase.name);
      const { id } = await addUserUseCase.execute(req.body);
      await addBalanceUseCase.execute(id);
      return res.redirect('/users/authentications');
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);
      if (translatedError instanceof InvariantError) {
        return res.render('register', { error: translatedError, req });
      }
      return next(error);
    }
  }

  async postUserPageHandler(req, res) {
    return res.render('register', { error: '', req });
  }
}

module.exports = UsersHandler;
