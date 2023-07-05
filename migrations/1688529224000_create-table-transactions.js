/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    id_user: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    id_movie: {
      type: 'INT',
      notNull: true,
    },
    id_show: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    total_price: {
      type: 'INT',
      notNull: true,
    },
    refund: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
    no_seat1: {
      type: 'VARCHAR(5)',
      notNull: true,
    },
    no_seat2: {
      type: 'VARCHAR(5)',
    },
    no_seat3: {
      type: 'VARCHAR(5)',
    },
    no_seat4: {
      type: 'VARCHAR(5)',
    },
    no_seat5: {
      type: 'VARCHAR(5)',
    },
    no_seat6: {
      type: 'VARCHAR(5)',
    },
    time: {
      type: 'TIMESTAMP',
      default: pgm.func('NOW()'),
    },
  });
  pgm.addConstraint('transactions', 'fk_transactions.id_user_users.id', 'FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('transactions', 'fk_transactions.id_show_shows.id', 'FOREIGN KEY(id_show) REFERENCES shows(id) ON DELETE CASCADE');
  pgm.addConstraint('transactions', 'fk_transactions.id_movie_movies.id', 'FOREIGN KEY(id_movie) REFERENCES movies(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('transactions', 'fk_transactions.id_user_users.id');
  pgm.dropConstraint('transactions', 'fk_transactions.id_show_shows.id');
  pgm.dropConstraint('transactions', 'fk_transactions.id_movie_movies.id');
  pgm.dropTable('transactions');
};
