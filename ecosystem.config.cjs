const fs = require("fs");
const path = require("path");

const port = process.env.PORT || "3000";
const appName = process.env.PM2_APP_NAME || "image-tools";
const envFile = process.env.SHARED_ENV_FILE || path.join(process.cwd(), ".env");
const envFileConfig = fs.existsSync(envFile) ? { env_file: envFile } : {};

module.exports = {
  apps: [
    {
      name: appName,
      cwd: process.cwd(),
      script: "server.js",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: port,
      },
      ...envFileConfig,
    },
  ],
};
