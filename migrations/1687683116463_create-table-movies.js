/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('movies', {
    id: {
      type: 'INT',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    release_date: {
      type: 'DATE',
      notNull: true,
    },
    poster_url: {
      type: 'TEXT',
      notNull: true,
    },
    age_rating: {
      type: 'INT',
      notNull: true,
    },
    ticket_price: {
      type: 'INT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('movies');
};
