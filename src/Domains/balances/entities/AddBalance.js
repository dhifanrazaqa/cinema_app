/* eslint-disable camelcase */
class AddBalance {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id_user } = payload;

    this.id_user = id_user;
  }

  _verifyPayload({ id_user }) {
    if (!id_user) {
      throw new Error('ADD_BALANCE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id_user !== 'string') {
      throw new Error('ADD_BALANCE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddBalance;
