const express   = require('express'),
      path      = require('path');

const router    = express.Router(),
      views     = path.join(__dirname, '/../views');

const api = require('./api');

router.use('/api', api);

router.get('/pid', (req, res) => {
    res.sendFile(path.resolve(views + '/spindle.html'));
});

module.exports = router;