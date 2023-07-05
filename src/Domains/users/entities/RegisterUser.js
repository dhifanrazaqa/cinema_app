class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      username, password, fullname, age,
    } = payload;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.age = age;
  }

  _verifyPayload({
    username, password, fullname, age,
  }) {
    if (!username || !password || !fullname || !age) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string' || typeof age !== 'number') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    if (age > 100 || age < 0) {
      throw new Error('REGISTER_USER.AGE_INVALID');
    }
  }
}

module.exports = RegisterUser;
