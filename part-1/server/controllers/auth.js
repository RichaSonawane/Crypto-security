const bcrypt = require("bcryptjs");
const users = []; //{username:"abc", pwdHash:"xxx"}

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const authenticated = bcrypt.compareSync(
          password,
          users[i].passwordHash
        );
        if (authenticated) {
          console.log("here");
          let userToReturn = { ...users[i] };
          delete userToReturn.passwordHash;
          res.status(200).send(userToReturn);
        }
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    console.log("Registering User");
    console.log(req.body);

    let { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const pwdHash = bcrypt.hashSync(password, salt);
    let newbody = {
      username: username,
      password: pwdHash,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    users.push(newbody);
    let newMsg = { ...newbody };
    delete newMsg.password;
    res.status(200).send(newMsg);
  },
};
