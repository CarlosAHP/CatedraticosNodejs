module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define('song', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        artist: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.INTEGER
        },
        extension: {
            type: Sequelize.STRING
        },
        album: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        }
    });

    return Song;
};
