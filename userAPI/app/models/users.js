// const table = require('../config/tables.json');
const { queryDatabase } = require('../database/mariadb');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getUserInfo = async (req, res) => {
    const user = req.body.userName;
    const sql = 'CALL get_customer_by_username(?)';

    const data = await queryDatabase(sql, [user]);
    // console.log(data[0]);
    res.json(data[0][0]);
};

exports.updateUserInfo = async (req, res) => {
    // TODO
    const newUserInfo = {
        ...req.body,
    };
    const required = [
        'surName',
        'lastName',
        'adress',
        'billingAdress',
        'userName',
        'email',
    ];
    if (!required.every((x) => x in newUserInfo)) {
        res.status(400).json({
            error: {
                message: 'missing fields',
            },
        });
        return;
    }
    const sql = 'CALL update_customer_info(?, ?, ?, ?, ?, ?)';
    const placeholder = [
        newUserInfo.userName,
        newUserInfo.surName,
        newUserInfo.lastName,
        newUserInfo.adress,
        newUserInfo.billingAdress,
        newUserInfo.email,
    ];
    const result = await queryDatabase(sql, placeholder);
    if (result.error) {
        res.status(500).json(result);
    } else {
        res.status(201).json({
            data: {
                message: 'user info updated',
            },
        });
    }
};

exports.updateUserPassword = async (req, res) => {
    const user = {
        ...req.body,
    };
    const sql = 'CALL update_customer_password(?, ?)';
    try {
        const hashedPassword = await bcrypt.hashSync(user.password, saltRounds);
        const data = await queryDatabase(sql, [user.userName, hashedPassword]);
        console.log(data);
        if (data.error) {
            res.status(500).json(data);
        } else {
            res.status(201).json({
                data: {
                    message: 'password updated',
                },
            });
        }
    } catch (err) {
        res.status(400).json({
            error: {
                message: 'bcrypt failed',
            },
        });
    }
};

exports.getUserTrips = async (req, res) => {
    const user = req.body.userName;
    const sql = 'CALL get_all_trips_by_username(?)';

    const data = await queryDatabase(sql, [user]);
    // console.log(data[0]);
    res.json({
        trips: data[0]
    });
};
