import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://lmsdb_owner:WBAlbt46PjwQ@ep-bold-butterfly-a1tg6cl7.ap-southeast-1.aws.neon.tech/lmsdb?sslmode=require",
  },
});
