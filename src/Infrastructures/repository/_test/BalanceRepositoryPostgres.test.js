const BalanceRepositoryPostgres = require('../BalanceRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const BalancesTableTestHelper = require('../../../../tests/BalanceTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('BalanceRepositoryPostgres', () => {
  afterEach(async () => {
    await BalancesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addBalance function', () => {
    it('should persist add balance', async () => {
      // Arrange
      const idUser = 'user-123';
      const fakeIdGenerator = () => '123';
      const balanceRepositoryPostgres = new BalanceRepositoryPostgres(pool, fakeIdGenerator);
      await UsersTableTestHelper.addUser({ id: 'user-123' });

      // Action
      await balanceRepositoryPostgres.addBalance(idUser);

      // Assert
      const balances = await BalancesTableTestHelper.findBalancesById('balance-123');
      expect(balances).toHaveLength(1);
    });
  });

  describe('getBalanceById', () => {
    it('should throw NotFoundError when balance not found', async () => {
      // Arrange
      const balanceRepositoryPostgres = new BalanceRepositoryPostgres(pool);

      // Action & Assert
      await expect(balanceRepositoryPostgres.getBalanceById('user-123'))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should return balance correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await BalancesTableTestHelper.addBalance({ id: 'balance-123' });

      const expectedBalance = 0;

      const balanceRepositoryPostgres = new BalanceRepositoryPostgres(pool);

      // Action
      const getBalance = await balanceRepositoryPostgres.getBalanceById('user-123');

      // Assert
      expect(getBalance).toStrictEqual(expectedBalance);
    });
  });

  describe('updateBalance function', () => {
    it('should persist update balance', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await BalancesTableTestHelper.addBalance({ id: 'balance-123' });

      const balancePayload = {
        id: 'user-123',
        newBalance: 20000,
      };

      const expectedBalance = {
        id: 'balance-123',
        id_user: 'user-123',
        balance: 20000,
      };

      const balanceRepositoryPostgres = new BalanceRepositoryPostgres(pool);

      // Action
      await balanceRepositoryPostgres.updateBalanceById(balancePayload);

      // Assert
      const balances = await BalancesTableTestHelper.findBalancesById('balance-123');
      expect(balances[0]).toEqual(expectedBalance);
    });
  });
});
