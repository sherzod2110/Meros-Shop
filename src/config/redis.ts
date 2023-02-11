import { createClient } from "redis"
import dotenv from "dotenv"

dotenv.config()

export default async () => {
  try {
    const client = createClient({
      url: "redis://127.0.0.1:6379",
    })

    client.on("error", (): void => console.log("Error"))

    await client?.connect()

    return client
  } catch (err: unknown) {
    console.log(err)
  }
}
