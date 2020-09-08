const jwt=require('jsonwebtoken')

module.exports = {
    isLoggedIn: (req, res, next) => {
      try {
        console.log(req.headers)
        const token =  req.headers.authorization.split(' ')[1];
        console.log(token)
        const decoded = jwt.verify(
          token,
          'SECRETKEY'
        );
        req.userData = decoded;
        next();
      } catch (err) {
        return res.status(401).send({
          msg: 'Your session is not valid!'
        });
      }
    }
}