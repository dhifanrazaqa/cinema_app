/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('balances', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    id_user: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    balance: {
      type: 'INT',
      notNull: true,
    },
  });
  pgm.addConstraint('balances', 'fk_balances.id_user_users.id', 'FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('threads', 'fk_balances.id_user_users.id');
  pgm.dropTable('balances');
};
