const { queryDatabase } = require('../../database/mariadb');
const { sqlToGeoJson, parseCoordinates } = require('../utils');

async function updateZone(req, res) {
    const { id } = req.params;
    const { coordinates, type, speedLimit } = req.body;
    const parsedCoordinates = parseCoordinates(coordinates);
    const sql = 'CALL update_zone(?,?,?,?);';
    const { affectedRows } = await queryDatabase(sql, [
        id,
        parsedCoordinates,
        type,
        speedLimit,
    ]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function insertZone(req, res) {
    const { coordinates, type, speedLimit } = req.body;
    const parsedCoordinates = parseCoordinates(coordinates);
    const sql = 'CALL insert_zone(?, ?, ?);';
    const { affectedRows } = await queryDatabase(sql, [
        parsedCoordinates,
        type,
        speedLimit,
    ]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
async function getAllZones(_, res) {
    const sql = 'CALL get_all_zones();';
    const { 0: data } = await queryDatabase(sql);
    res.json(sqlToGeoJson(data));
}
async function getZonesByid(req, res) {
    const { id } = req.params;
    const sql = 'CALL get_all_zones_by_id(?);';
    const { 0: data } = await queryDatabase(sql, [id]);
    res.json(sqlToGeoJson(data));
}

async function deleteZoneByid(req, res) {
    const { id } = req.params;
    const sql = 'CALL delete_zone_by_id(?);';
    const { affectedRows } = await queryDatabase(sql, [id]);
    if (affectedRows) {
        res.sendStatus(200);
    } else {
        res.sendStatus(204);
    }
}

module.exports = {
    getAllZones,
    getZonesByid,
    insertZone,
    updateZone,
    deleteZoneByid,
};
