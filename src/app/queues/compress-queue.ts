import { Queue } from "bullmq";
import { getRedisConnectionOptions } from "@/lib/redis";
import { debugLog } from "@/lib/debug";

type GlobalQueueState = {
  compressQueue?: Queue;
};

const globalState = globalThis as typeof globalThis & GlobalQueueState;
const redisConnectionOptions = getRedisConnectionOptions();

function getConnectionDebugInfo() {
  const connection: {
    host?: string;
    port?: number;
    db?: number;
  } = {};

  if ("host" in redisConnectionOptions) {
    connection.host = redisConnectionOptions.host;
  }

  if ("port" in redisConnectionOptions) {
    connection.port = redisConnectionOptions.port;
  }

  if ("db" in redisConnectionOptions) {
    connection.db = redisConnectionOptions.db;
  }

  return connection;
}

export const compressQueue =
  globalState.compressQueue ??
  new Queue("compress-image", {
    connection: redisConnectionOptions,
    prefix: "bull",
  });

if (!globalState.compressQueue) {
  globalState.compressQueue = compressQueue;
  debugLog("queue", "Initialized BullMQ queue", {
    name: "compress-image",
    connection: getConnectionDebugInfo(),
  });
}
