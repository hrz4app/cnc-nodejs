const express   = require('express'),
      path      = require('path');

const app       = express(),
      server    = require('http').Server(app),
      io        = require('socket.io')(server),
      public    = path.join(__dirname, 'public'),
      port      = 3006;

const db        = require('./models'),
      routes    = require('./routes');

// app configuration
app.use(require('morgan')('dev'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static(public));
app.use(require('serve-favicon')(path.join(public, 'favicon.ico')));
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/', routes);

// db connection
db.connect().then(
    () => {
        console.log('database connected!');
        server.listen(port);
        console.log(`app listening on port ${port}`);

        const Spindlespeed = require('./models/Spindlespeed');

        io.on('connection', sockets => {
            Spindlespeed.find({}, (err, speeds) => {
                sockets.emit('initSpindle', speeds);
            });
        });
    },
    err => {
        console.error.bind(console, 'connection error:');
    }
);