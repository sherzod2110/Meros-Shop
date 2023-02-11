import path from "path"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "otto.db.elephantsql.com",
  password: "Bwm1gSfynF0hU8_DrSpilXfcdq_t_bjf",
  port: 5432,
  username: "rsqhaibe",
  database: "rsqhaibe",
  entities: [path.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
  migrations: [path.resolve(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: false,
})

export { AppDataSource }
// postgres://rsqhaibe:Bwm1gSfynF0hU8_DrSpilXfcdq_t_bjf@otto.db.elephantsql.com/rsqhaibe
