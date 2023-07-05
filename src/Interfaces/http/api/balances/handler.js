const GetBalanceUseCase = require('../../../../Applications/use_case/GetBalanceUseCase');
const TopUpBalanceUseCase = require('../../../../Applications/use_case/TopUpBalanceUseCase');

class BalancesHandler {
  constructor(container) {
    this._container = container;

    this.getBalanceHandler = this.getBalanceHandler.bind(this);
    this.updateBalanceHandler = this.updateBalanceHandler.bind(this);
  }

  async getBalanceHandler(req, res, next) {
    try {
      const idUser = req.session.userid;
      if (!idUser) return res.render('errornotauthorized', { req });

      const getBalanceUseCase = this._container.getInstance(GetBalanceUseCase.name);
      const balance = await getBalanceUseCase.execute(idUser);
      return res.render('balance', { req, balance });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async updateBalanceHandler(req, res, next) {
    try {
      const { newBalance } = req.body;
      const id = req.session.userid;
      const topUpBalanceUseCase = this._container.getInstance(TopUpBalanceUseCase.name);
      await topUpBalanceUseCase.execute({ id, newBalance });
      return res.redirect('/balances');
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BalancesHandler;
