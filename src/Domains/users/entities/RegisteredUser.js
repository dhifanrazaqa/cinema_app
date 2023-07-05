class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, username, fullname, age,
    } = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.age = age;
  }

  _verifyPayload({
    id, username, fullname, age,
  }) {
    if (!id || !username || !fullname || !age) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string' || typeof age !== 'number') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
