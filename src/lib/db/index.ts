import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
neonConfig.fetchConnectionCache = true;

if(!process.env.NEXT_PUBLIC_DATABASE_URL) {

    throw new Error('data base url not found')
}

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL)
// const sql = neon(
//   "postgresql://neondb_owner:pPM1CWZ8mleB@ep-wild-band-a13b22f5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
// );

export const db = drizzle(sql);
