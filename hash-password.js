const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = '1234'; // Replace with your plaintext password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log('Hashed password:', hashedPassword);
}

hashPassword();
