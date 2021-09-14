const PassSchema = require('../models/Password');

module.exports = (req, res, next)=>{
    if (!PassSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'The password must contain 10 characters with upper case, lower case and a number.' });
    } else {
        next();
    }
}
