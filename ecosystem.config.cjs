const port = process.env.PORT || "3000";
const appName = process.env.PM2_APP_NAME || "image-tools";

module.exports = {
  apps: [
    {
      name: appName,
      cwd: process.cwd(),
      script: "node_modules/next/dist/bin/next",
      args: `start -p ${port} -H 0.0.0.0`,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: port,
      },
    },
  ],
};
