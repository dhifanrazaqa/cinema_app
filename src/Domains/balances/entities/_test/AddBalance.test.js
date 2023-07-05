const AddBalance = require('../AddBalance');

describe('a AddBalances entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
    };

    // Action and Assert
    expect(() => new AddBalance(payload)).toThrowError('ADD_BALANCE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id_user: {},
    };

    // Action and Assert
    expect(() => new AddBalance(payload)).toThrowError('ADD_BALANCE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddBalance object correctly', () => {
    // Arrange
    const payload = {
      id_user: 'user-123',
    };

    // Action
    const addBalance = new AddBalance(payload);

    // Assert
    expect(addBalance.id_user).toEqual(payload.id_user);
  });
});
