/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('session', {
    sid: {
      type: 'varchar',
      notNull: true,
      primaryKey: true,
    },
    sess: {
      type: 'json',
      notNull: true,
    },
    expire: {
      type: 'timestamp(6)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('session');
};
