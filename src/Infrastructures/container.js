/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepository = require('../Domains/users/UserRepository');
const MovieRepository = require('../Domains/movies/MovieRepository');
const BalanceRepository = require('../Domains/balances/BalanceRepository');
const ShowRepository = require('../Domains/shows/ShowRepository');
const PasswordHash = require('../Applications/security/PasswordHash');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const MovieRepositoryPostgres = require('./repository/MovieRepositoryPostgres');
const BalanceRepositoryPostgres = require('./repository/BalanceRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const GetAllMovieUseCase = require('../Applications/use_case/GetAllMovieUseCase');
const GetDetailMovieUseCase = require('../Applications/use_case/GetDetailMovieUseCase');
const AddBalanceUseCase = require('../Applications/use_case/AddBalanceUseCase');
const GetBalanceUseCase = require('../Applications/use_case/GetBalanceUseCase');
const TopUpBalanceUseCase = require('../Applications/use_case/TopUpBalanceUseCase');
const GetShowUseCase = require('../Applications/use_case/GetShowUseCase');
const ShowRepositoryPostgres = require('./repository/ShowRepositoryPostgres');
const SeatRepository = require('../Domains/seats/SeatRepository');
const SeatRepositoryPostgres = require('./repository/SeatRepositoryPostgres');
const GetSeatUseCase = require('../Applications/use_case/GetSeatUseCase');
const TransactionRepository = require('../Domains/transactions/TransactionRepository');
const TransactionRepositoryPostgres = require('./repository/TransactionRepositoryPostgres');
const AddTransactionUseCase = require('../Applications/use_case/AddTransactionUseCase');
const UpdateSeatUseCase = require('../Applications/use_case/UpdateSeatUseCase');
const GetTransactionUseCase = require('../Applications/use_case/GetTransactionUseCase');
const UpdateTransactionUseCase = require('../Applications/use_case/UpdateTransactionUseCase');
const VerifySeatUseCase = require('../Applications/use_case/VerifySeatUseCase');
const GetUserUseCase = require('../Applications/use_case/GetUserUseCase');

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: MovieRepository.name,
    Class: MovieRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: BalanceRepository.name,
    Class: BalanceRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: TransactionRepository.name,
    Class: TransactionRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: ShowRepository.name,
    Class: ShowRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: SeatRepository.name,
    Class: SeatRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: AddBalanceUseCase.name,
    Class: AddBalanceUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'balanceRepository',
          internal: BalanceRepository.name,
        },
      ],
    },
  },
  {
    key: AddTransactionUseCase.name,
    Class: AddTransactionUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'transactionRepository',
          internal: TransactionRepository.name,
        },
        {
          name: 'balanceRepository',
          internal: BalanceRepository.name,
        },
      ],
    },
  },
  {
    key: TopUpBalanceUseCase.name,
    Class: TopUpBalanceUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'balanceRepository',
          internal: BalanceRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateSeatUseCase.name,
    Class: UpdateSeatUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'seatRepository',
          internal: SeatRepository.name,
        },
      ],
    },
  },
  {
    key: VerifySeatUseCase.name,
    Class: VerifySeatUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'seatRepository',
          internal: SeatRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateTransactionUseCase.name,
    Class: UpdateTransactionUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'transactionRepository',
          internal: TransactionRepository.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
  },
  {
    key: GetAllMovieUseCase.name,
    Class: GetAllMovieUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'movieRepository',
          internal: MovieRepository.name,
        },
      ],
    },
  },
  {
    key: GetDetailMovieUseCase.name,
    Class: GetDetailMovieUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'movieRepository',
          internal: MovieRepository.name,
        },
      ],
    },
  },
  {
    key: GetBalanceUseCase.name,
    Class: GetBalanceUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'balanceRepository',
          internal: BalanceRepository.name,
        },
      ],
    },
  },
  {
    key: GetShowUseCase.name,
    Class: GetShowUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'showRepository',
          internal: ShowRepository.name,
        },
      ],
    },
  },
  {
    key: GetSeatUseCase.name,
    Class: GetSeatUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'seatRepository',
          internal: SeatRepository.name,
        },
      ],
    },
  },
  {
    key: GetTransactionUseCase.name,
    Class: GetTransactionUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'transactionRepository',
          internal: TransactionRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserUseCase.name,
    Class: GetUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
