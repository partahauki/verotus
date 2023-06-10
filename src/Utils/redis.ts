import { createClient } from "redis";
import env from "../../environment";

export let redisClient: ReturnType<typeof createClient>;

export async function initRedis(): Promise<void> {
  if (process.env.NODE_ENV !== "test") {
    redisClient = createClient({ socket: { port: env.REDIS_PORT } });
    redisClient.on("error", (error: string) => {
      console.error(`Error : ${error.toString()}`);
    });

    await redisClient.connect();
  }
}

export async function quitRedis(): Promise<void> {
  redisClient !== null && (await redisClient.quit());
}
