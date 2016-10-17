const PROD  = 'production';
const STAGE = 'stage';
const DEV   = 'development';

module.exports = {
    app    : {
        siteName : 'Energystar Rater Pro'
    },
    port   : process.env.PORT || 3000,
    static : 'dist',
    ENV    : {
        PROD  : PROD,
        STAGE : STAGE,
        DEV   : DEV
    },
    db     : '127.0.0.1:5984'
};
