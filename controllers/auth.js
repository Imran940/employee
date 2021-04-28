const { db } = require("../config_db/config");
exports.getSignup = (req, res) => {
    const { username, email, password, security } = req.body;
    const sql = "insert into signup values(?,?,?,?)"
    db.query(sql, [username, email, password, security], (err, result) => {
        if (!err) {
            console.log(result)
            res.send("user created successfully ")
        } else {
            console.log("inserting error--->", err)
            return res.status(400).send(err)
        }
    })
}
exports.getLogin = (req, res) => {
    const { username, password } = req.headers;
    const sql = "select * from signup where username=? and password=?";
    db.query(sql, [username, password], (err, result) => {
        if (result.length > 0) {
            console.log(result)
            res.send(result);
        } else {
            console.log("login error-->", err)
            return res.status(400).send("Login failed, please check username and password properly")
        }
    })
}
exports.getPassword = (req, res) => {
    const { security, username } = req.headers;
    const sql = "select password from signup where username=? and security=?";
    db.query(sql, [username, security], (err, result) => {
        if (result.length > 0) {
            console.log(result)
            res.send(result);
        } else {
            console.log("password getting error-->", err)
            return res.status(400).send("Please check username and security answer")
        }
    })
}