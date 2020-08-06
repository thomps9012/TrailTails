// The purpose of this file is to export our environments as a module so that we can set up JawsDB for Heroku hosting and our local MySQL database when locally hosted. 

module.exports = {
    "development": {
        "username": "root",
        "password": "password",
        "database": "TrailTails_db",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": "password",
        "database": "TrailTails_db_test",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
}