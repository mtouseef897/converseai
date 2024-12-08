// import { db } from './index.js'
// import { sql } from 'drizzle-orm'; // Import the sql function from Drizzle ORM

// async function createFeedbacksTable() {
//     const createTableQuery = sql`
//         CREATE TABLE IF NOT EXISTS feedbacks (
//             id SERIAL PRIMARY KEY,
//             user_id VARCHAR(256) NOT NULL,
//             username VARCHAR(256) NOT NULL,
//             profile_img VARCHAR(256),
//             content TEXT NOT NULL,
//             created_at TIMESTAMP NOT NULL DEFAULT NOW()
//         );
//     `;

//     await db.execute(createTableQuery);
// }

// // Call the function to create the table
// createFeedbacksTable()
//     .then(() => {
//         console.log("Feedbacks table created successfully.");
//     })
//     .catch((error) => {
//         console.error("Error creating feedbacks table:", error);
//     });

// import { db } from "./index.js";
// import { sql } from "drizzle-orm"; // Import the sql function from Drizzle ORM

// async function createSharedChatsTable() {
//   const createTableQuery = sql`
//         CREATE TABLE IF NOT EXISTS shared_chats (
//             id SERIAL PRIMARY KEY,
//             chat_id INTEGER NOT NULL,
//             shared_link VARCHAR(256) NOT NULL UNIQUE,
//             created_at TIMESTAMP NOT NULL DEFAULT NOW(),
//             FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
//         );
//     `;

//   await db.execute(createTableQuery);
// }

// // Call the function to create the table
// createSharedChatsTable()
//   .then(() => {
//     console.log("SharedChats table created successfully.");
//   })
//   .catch((error) => {
//     console.error("Error creating SharedChats table:", error);
//   });

import { db } from "./index.js";
import { sql } from "drizzle-orm"; // Import the sql function from Drizzle ORM

async function createPremiumUsersTable() {
  const createTableQuery = sql`
    CREATE TABLE IF NOT EXISTS premium_users (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(256) NOT NULL,
        payment VARCHAR(256),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  await db.execute(createTableQuery);
}

// Call the function to create the table
createPremiumUsersTable()
  .then(() => {
    console.log("PremiumUsers table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating PremiumUsers table:", error);
  });

