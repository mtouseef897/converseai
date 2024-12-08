
import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config({ path:  ".env" });
 export default{
driver:'pglite',
schema:'./src/lib/db/schemas.ts',
dbCredentials:{
  url:process.env.NEXT_PUBLIC_DATABASE_URL as string,
  
},
dialect:"postgresql"
 } satisfies Config;