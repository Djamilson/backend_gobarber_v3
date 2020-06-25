[
  {
    "type": "postgres",
    "host": "localhost",
    "port": "25432",
    "username": "",
    "password": "",
    "database": "gostack",
    "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": "27017",
    "database": "gostack",
    "useUnifiedTopology": true,
    "entities": ["./src/modules/**/infra/typeorm/schemas/*.ts"]
  }
]
