# 🔗 URL Shortener

A dynamic and visually interactive **Node.js-based URL Shortener** with authentication, role-based access, and analytics tracking.

---

## 🚀 Features
- ✨ **Shorten URLs** with unique short IDs
- 📊 **Analytics** – track total clicks & visit history
- 🔐 **Authentication** – secure login & signup
- 👥 **Role-based Access** – `ADMIN` & `NORMAL` users
- 🎨 **Smooth UI** with modern, responsive design
- 🗄 **MongoDB Database** for storing URLs & user data

---

## 📂 Project Structure
URL-Shortner/
├── controllers/        # Controller logic for routes
├── middlewares/        # Authentication & role restriction
├── models/             # Mongoose models
├── public/              # Static assets (CSS, JS, images)
├── routes/             # Express route handlers
├── views/              # EJS templates
├── index.js            # Main server file
└── package.json

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS, CSS, JavaScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens) / Cookies
- **Styling**: Custom CSS + animations

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repo
git clone https://github.com/ShadowOO7/URL-Shortener.git

# 2️⃣ Go into the project folder
cd URL-Shortener

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create a .env file and add:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=3000

# 5️⃣ Run the server
npm run dev

📸 Screenshots
Home Page
Analytics Page

📜 License

This project is licensed under the MIT License.

💡 Contributions are welcome!
If you have ideas for improvement, feel free to open an issue or submit a PR.
