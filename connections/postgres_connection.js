const Sequelize = require('sequelize')
class PostgresConnection {
    constructor() {
    }
    async initialize() {
       return await this.initializeDatabase();
    }

    async initializeDatabase() {
        try {
            let sequelizeProps = {
                host: process.env.POSTGRES_HOST,
                port: process.env.POSTGRES_PORT,
                dialect: 'postgres',
                logging: false,
                define: {
                    timestamps: true
                },
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                }
            };
            const sequelize = new Sequelize(
                process.env.POSTGRES_DATABASE,
                process.env.POSTGRES_USERNAME,
                process.env.POSTGRES_PASSWORD,
                sequelizeProps
            );
            // global.DATA.CONNECTION.postgres = sequelize;
            await sequelize.authenticate();
            console.log(`Connected to PostgreSQL Database Successfully - ${process.env.POSTGRES_DBNAME}`);
            return sequelize;
        } catch (error) {
            console.error('Unable to connect to the postgres database:', error.message);
        }
    }
}
class MyConnection {
    static _instance
    constructor() {
    }
    static async createConnection() {
        this._instance = await new PostgresConnection().initialize();
    }
    static async getInstance() {
        if (this._instance) {
          return this._instance;
        }
        await this.createConnection();
        return this._instance;
      }
}

module.exports = MyConnection;