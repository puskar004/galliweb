// Run with: npm run hash-password
// Prompts for a plain-text password and prints its bcrypt hash, which you
// paste into .env as ADMIN_PASSWORD_HASH. This avoids needing a database
// row (or a seed script) just to store one admin's credentials.

const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter the admin password you want to use: ", async (password) => {
  if (!password || password.length < 6) {
    console.error("\nPassword should be at least 6 characters. Try again.");
    rl.close();
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  console.log("\nPaste this into your .env file as ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
  console.log("");
  rl.close();
});
