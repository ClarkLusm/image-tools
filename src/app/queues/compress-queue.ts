import { Queue } from "bullmq";
import { getRedisConnectionOptions } from "@/lib/redis";
import { debugLog } from "@/lib/debug";

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
  const { host, port, db } = redisConnectionOptions;
  debugLog("queue", "Initialized BullMQ queue", {
    name: "compress-image",
    connection: { host, port, db },
  });
}
