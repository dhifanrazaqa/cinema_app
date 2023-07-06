const GetAllMovieUseCase = require('../../../../Applications/use_case/GetAllMovieUseCase');
const GetDetailMovieUseCase = require('../../../../Applications/use_case/GetDetailMovieUseCase');
const GetShowUseCase = require('../../../../Applications/use_case/GetShowUseCase');

class MoviesHandler {
  constructor(container) {
    this._container = container;

    this.getAllMovieHandler = this.getAllMovieHandler.bind(this);
    this.getDetailMovieHandler = this.getDetailMovieHandler.bind(this);
  }

  async getAllMovieHandler(req, res, next) {
    try {
      if (!req.session.userid) req.session.userid = '';

      const getAllMovieUseCase = this._container.getInstance(GetAllMovieUseCase.name);
      const movies = await getAllMovieUseCase.execute();
      return res.render('index', { req, movies });
    } catch (error) {
      return next(error);
    }
  }

  async getDetailMovieHandler(req, res, next) {
    try {
      const getDetailMovieUseCase = this._container.getInstance(GetDetailMovieUseCase.name);
      const getShowUseCase = this._container.getInstance(GetShowUseCase.name);

      const movie = await getDetailMovieUseCase.execute(req.params);
      const shows = await getShowUseCase.execute(req.params);

      return res.render('detail', { req, movie, shows });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = MoviesHandler;
