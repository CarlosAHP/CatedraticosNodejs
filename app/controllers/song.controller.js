const db = require('../config/db.config.js');
const Song = db.Song;

exports.create = (req, res) => {
    const song = {
        name: req.body.name,
        description: req.body.description,
        artist: req.body.artist,
        duration: req.body.duration,
        extension: req.body.extension,
        album: req.body.album,
        year: req.body.year
    };

    Song.create(song)
        .then(result => {
            res.status(200).json({
                message: "Song created successfully with id = " + result.id,
                song: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while creating song!",
                error: error.message
            });
        });
};

exports.findAll = (req, res) => {
    Song.findAll()
        .then(songs => {
            res.status(200).json({
                message: "Retrieved all songs successfully",
                songs: songs
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while retrieving songs",
                error: error.message
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Song.findByPk(id)
        .then(song => {
            if (song) {
                res.status(200).json({
                    message: "Retrieved song successfully",
                    song: song
                });
            } else {
                res.status(404).json({
                    message: "Song not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while retrieving song",
                error: error.message
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const updatedData = {
        name: req.body.name,
        description: req.body.description,
        artist: req.body.artist,
        duration: req.body.duration,
        extension: req.body.extension,
        album: req.body.album,
        year: req.body.year
    };

    Song.update(updatedData, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Song updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Song not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while updating song",
                error: error.message
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Song.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Song deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Song not found with id = " + id
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error while deleting song",
                error: error.message
            });
        });
};
