module.exports = {
    connect : () => {
        return require('mongoose').connect('mongodb://127.0.0.1:27017/cncGrafir', { useNewUrlParser: true });
    }
}