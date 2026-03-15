import type { ConnectionOptions } from "bullmq";

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 6379;

export const getRedisConnectionOptions = (): ConnectionOptions => {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return { host: DEFAULT_HOST, port: DEFAULT_PORT };
  }

  const url = new URL(redisUrl);
  const isSecure = url.protocol === "rediss:";
  const port = url.port ? Number(url.port) : DEFAULT_PORT;
  const db = url.pathname ? Number(url.pathname.replace("/", "")) : undefined;

  const options: ConnectionOptions = {
    host: url.hostname || DEFAULT_HOST,
    port,
    db: 0
  };

  if (url.username) options.username = decodeURIComponent(url.username);
  if (url.password) options.password = decodeURIComponent(url.password);
  if (!Number.isNaN(db) && db !== undefined) options.db = db;
  if (isSecure) options.tls = {};

  return options;
};
