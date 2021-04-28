const { db } = require("../config_db/config")
exports.getCheckUser = (req, res) => {
    const username = req.headers.username;
    const sql = "select username from signup where username=?";
    db.query(sql, [username], (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result)
        } else {
            return console.log(err)
        }
    })
}
exports.getCheckEmail = (req, res) => {
    const email = req.headers.email;
    const sql = "select email from signup where email=?";
    db.query(sql, [email], (err, result) => {
        if (!err) {
            console.log(result);
            res.send(result)
        } else {
            return console.log(err)
        }
    })
}

exports.postProfile = (req, res) => {
    const { username, Name, age, address, email, phone } = req.body;
    const sql = "insert into profile values(?,?,?,?,?,?)"
    db.query(sql, [username, Name, age, address, email, phone], (err, result) => {
        if (!err) {
            console.log(result)
            res.send(result)
        } else {
            console.log("inserting error--->", err)
            return res.status(400).send(err)
        }
    })
}
exports.getProfile = (req, res) => {
    const { username } = req.headers;
    const sql = "select * from profile where username=?";
    db.query(sql, [username], (err, result) => {
        if (result.length > 0) {
            console.log(result)
            res.send(result);
        } else {
            console.log("profile select error-->", err)
        }
    })
}