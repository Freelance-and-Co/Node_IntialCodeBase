require('dotenv').config();

global.DATA = {
    CONNECTION: {
        postgres: undefined
    }
}

const MyConnection = require('./connections/postgres_connection')

const InitializeConnection = async () => {
    try {
        await MyConnection.createConnection();

    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

async function IntializeApp() {
    const App = require('./app');
    const app = new App();
    app.listen();
}

(async function () {
    await InitializeConnection();
    await IntializeApp();
})();