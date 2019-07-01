const Requester = require('./requester');

module.exports = (config) => {
    return {
        type: 'database',
        handle: (req, res, app, next) => {
            if (!app.requester) {
                const { host, dbname, user, password, port, useCache } = config;

                let uri = '';
                if (user && password) {
                    uri = `mongodb://${user}:${!!password ? password : ''}@${host}:${!!port ? port : 27017}/${dbname}`;
                } else {
                    uri = `mongodb://${host}:${!!port ? port : 27017}/${dbname}`;
                }

                app.requester = new Requester(uri, dbname, useCache);
            }

            next();
        }
    }
};
