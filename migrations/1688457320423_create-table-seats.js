/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('seats', {
    id: {
      type: 'INT',
      primaryKey: true,
    },
    id_show: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    no_seat: {
      type: 'VARCHAR(5)',
      notNull: true,
    },
    available: {
      type: 'boolean',
      notNull: true,
    },
  });
  pgm.addConstraint('seats', 'fk_seats.id_show_shows.id', 'FOREIGN KEY(id_show) REFERENCES shows(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('seats', 'fk_seats.id_show_shows.id');
  pgm.dropTable('seats');
};
