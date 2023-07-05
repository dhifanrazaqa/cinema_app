const AuthenticationError = require('./AuthenticationError');
const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'REGISTER_USER.AGE_INVALID': new InvariantError('tidak dapat membuat user baru karena umur tidak valid'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'DETAIL_MOVIE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('data movie tidak lengkap'),
  'DETAIL_MOVIE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('data movie tidak sesuai tipe datanya'),
  'Invalid token signature': new AuthenticationError('Token tidak valid'),
  'Missing authentication': new AuthenticationError('Missing authentication'),
};

module.exports = DomainErrorTranslator;
