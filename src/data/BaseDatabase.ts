import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

abstract class BaseDatabase {
    static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        }
    })

    abstract TABLE_NAME: string
}

export default BaseDatabase