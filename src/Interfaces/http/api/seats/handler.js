const GetDetailMovieUseCase = require('../../../../Applications/use_case/GetDetailMovieUseCase');
const GetSeatUseCase = require('../../../../Applications/use_case/GetSeatUseCase');
const GetUserUseCase = require('../../../../Applications/use_case/GetUserUseCase');

class SeatsHandler {
  constructor(container) {
    this._container = container;

    this.getSeatHandler = this.getSeatHandler.bind(this);
  }

  async getSeatHandler(req, res, next) {
    try {
      const idUser = req.session.userid;
      if (!idUser) return res.render('errornotauthorized', { req });

      const getSeatUseCase = this._container.getInstance(GetSeatUseCase.name);
      const getUserUseCase = this._container.getInstance(GetUserUseCase.name);
      const getDetailMovieUseCase = this._container.getInstance(GetDetailMovieUseCase.name);

      const user = await getUserUseCase.execute(idUser);
      const movie = await getDetailMovieUseCase.execute(req.params);
      const seats = await getSeatUseCase.execute(req.params);

      return res.render('seats', {
        req, seats, user, movie,
      });
    } catch (error) {
      if (error.message === 'user tidak ditemukan') {
        return res.render('errornotauthorized', { req });
      }
      return next(error);
    }
  }
}

module.exports = SeatsHandler;
