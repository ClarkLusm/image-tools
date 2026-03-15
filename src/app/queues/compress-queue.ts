import { Queue } from "bullmq";
import { getRedisConnectionOptions } from "@/lib/redis";

type GlobalQueueState = {
  compressQueue?: Queue;
};

const globalState = globalThis as typeof globalThis & GlobalQueueState;
const redisConnectionOptions = getRedisConnectionOptions();

export const compressQueue =
  globalState.compressQueue ??
  new Queue("compress-image", {
    connection: redisConnectionOptions,
    prefix: "bull",
  });

if (!globalState.compressQueue) {
  globalState.compressQueue = compressQueue;
}
