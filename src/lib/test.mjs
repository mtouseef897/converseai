import pkg from "@clerk/nextjs/server"; // Default import for CommonJS module
const { auth } = pkg; // Destructure to get the auth function
import { clerkClient } from "@clerk/clerk-sdk-node";

async function fetchUserDetails(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    console.log(user); // Log user details
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

async function main() {
  const { userId } = await auth(); // Get userId from Clerk

  if (!userId) {
    console.error("No userId found");
    return;
  }

  // Call the function with the valid userId
  await fetchUserDetails(userId);
}

// Run the main function
main().catch(console.error);
