/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('shows', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    id_movie: {
      type: 'INT',
      notNull: true,
    },
    st_time: {
      type: 'VARCHAR(10)',
      notNull: true,
    },
  });
  pgm.addConstraint('shows', 'fk_shows.id_movie_movies.id', 'FOREIGN KEY(id_movie) REFERENCES movies(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('shows', 'fk_shows.id_movie_movies.id');
  pgm.dropTable('shows');
};
