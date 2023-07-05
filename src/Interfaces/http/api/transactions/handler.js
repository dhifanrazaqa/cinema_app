const AddTransactionUseCase = require('../../../../Applications/use_case/AddTransactionUseCase');
const GetBalanceUseCase = require('../../../../Applications/use_case/GetBalanceUseCase');
const GetDetailMovieUseCase = require('../../../../Applications/use_case/GetDetailMovieUseCase');
const GetShowUseCase = require('../../../../Applications/use_case/GetShowUseCase');
const GetTransactionUseCase = require('../../../../Applications/use_case/GetTransactionUseCase');
const TopUpBalanceUseCase = require('../../../../Applications/use_case/TopUpBalanceUseCase');
const UpdateSeatUseCase = require('../../../../Applications/use_case/UpdateSeatUseCase');
const UpdateTransactionUseCase = require('../../../../Applications/use_case/UpdateTransactionUseCase');
const VerifySeatUseCase = require('../../../../Applications/use_case/VerifySeatUseCase');

class TransactionsHandler {
  constructor(container) {
    this._container = container;

    this.getTransactionPageHandler = this.getTransactionPageHandler.bind(this);
    this.getAllTransactionHandler = this.getAllTransactionHandler.bind(this);
    this.postTransactionHandler = this.postTransactionHandler.bind(this);
    this.postRefundTransactionHandler = this.postRefundTransactionHandler.bind(this);
  }

  async getTransactionPageHandler(req, res, next) {
    try {
      const idUser = req.session.userid;
      if (!idUser) return res.render('errornotauthorized', { req });

      const { showtime } = req.params;

      const verifySeatUseCase = this._container.getInstance(VerifySeatUseCase.name);
      await verifySeatUseCase.execute({ idShow: req.params.showtime, noSeat: req.body });

      const getBalanceUseCase = this._container.getInstance(GetBalanceUseCase.name);
      const getDetailMovieUseCase = this._container.getInstance(GetDetailMovieUseCase.name);
      const getShowUseCase = this._container.getInstance(GetShowUseCase.name);

      const balance = await getBalanceUseCase.execute(idUser);
      const movie = await getDetailMovieUseCase.execute(req.params);
      const show = await getShowUseCase.execute(req.params);

      return res.render('transactions', {
        req, balance, movie, show, showtime,
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async getAllTransactionHandler(req, res, next) {
    try {
      const idUser = req.session.userid;
      if (!idUser) return res.render('errornotauthorized', { req });

      const getTransactionUseCase = this._container.getInstance(GetTransactionUseCase.name);

      const transactions = await getTransactionUseCase.execute(idUser);
      return res.render('transactionsinfo', { req, transactions });
    } catch (error) {
      return next(error);
    }
  }

  async postTransactionHandler(req, res, next) {
    console.log(req.body);
    try {
      const idUser = req.session.userid;
      if (!idUser) return res.render('errornotauthorized', { req });

      const addTransactionUseCase = this._container.getInstance(AddTransactionUseCase.name);
      const topUpBalanceUseCase = this._container.getInstance(TopUpBalanceUseCase.name);
      const updateSeatUseCase = this._container.getInstance(UpdateSeatUseCase.name);

      await addTransactionUseCase.execute(req.body);
      await updateSeatUseCase.execute({
        idShow: req.body.idShow,
        noSeat: [
          req.body.noSeat1, req.body.noSeat2, req.body.noSeat3,
          req.body.noSeat4, req.body.noSeat5, req.body.noSeat6,
        ],
      });
      await topUpBalanceUseCase.execute({ id: idUser, newBalance: `-${req.body.totalPrice}` });

      return res.redirect('/transactions');
    } catch (error) {
      return next(error);
    }
  }

  async postRefundTransactionHandler(req, res, next) {
    console.log(req.body);
    try {
      const idUser = req.session.userid;
      if (!idUser) return res.render('errornotauthorized', { req });

      const updateTransactionUseCase = this._container.getInstance(UpdateTransactionUseCase.name);
      const topUpBalanceUseCase = this._container.getInstance(TopUpBalanceUseCase.name);
      const updateSeatUseCase = this._container.getInstance(UpdateSeatUseCase.name);

      await updateTransactionUseCase.execute(req.body);
      await updateSeatUseCase.execute({
        idShow: req.body.idShow,
        noSeat: [
          req.body.noSeat1, req.body.noSeat2, req.body.noSeat3,
          req.body.noSeat4, req.body.noSeat5, req.body.noSeat6,
        ],
      });
      await topUpBalanceUseCase.execute({
        id: idUser, newBalance: req.body.totalPrice,
      });

      return res.redirect('.');
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = TransactionsHandler;
