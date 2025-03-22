const createConnection = require('./db'); // Ensure consistent naming
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// 🟢 **Login Route**
app.post('/log', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log("Username and password required");
    return res.status(400).json({ message: "Username and password required" });
  }

  let connection;
  try {
    connection = await createConnection();
    const [users] = await connection.execute(
      'SELECT * FROM user_data WHERE username = ? AND pass = ?',
      [username, password]
    );

    if (users.length === 1) {
      console.log("Login successful!");
      return res.json({ message: "Login successful!", success: true });
    }

    return res.status(401).json({ message: "Invalid username or password", success: false });

  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) await connection.end();
  }
});


// 🟢 **Register Route**
app.post('/register', async (req, res) => {
  const { username, password, email, phone } = req.body;

  if (!username || !password || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let connection;
  try {
    connection = await createConnection();
    await connection.execute(
      'INSERT INTO user_data (username, pass, email, phone) VALUES (?, ?, ?, ?)',
      [username, password, email, phone]
    );

    console.log("User registered successfully!");
    return res.json({ message: "Registration successful!", success: true });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log("The username, email, or phone number already exists");
      return res.status(400).json({ message: "Username, email, or phone number already exists" });
    } else if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
      console.log("The email or phone number is in an invalid format");
      return res.status(400).json({ message: "Invalid email or phone format" });
    } else {
      console.log("Database error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } finally {
    if (connection) await connection.end();
  }
});


// 🟢 **Start the Server**
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
