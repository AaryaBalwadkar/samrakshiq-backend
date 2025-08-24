# SamrakshIQ Backend

A Node.js + Express backend

---

## 📦 Project Structure

```
src/
 ┣ config/
 ┃ ┗ db.js
 ┣ controllers/
 ┃ ┣ authController.js
 ┃ ┣ fileController.js
 ┃ ┣ processingController.js
 ┃ ┗ miscController.js
 ┣ middlewares/
 ┃ ┣ auth.js
 ┃ ┗ errorHandler.js
 ┣ models/
 ┃ ┣ userModel.js
 ┃ ┗ sessionModel.js
 ┣ routes/
 ┃ ┣ authRoutes.js
 ┃ ┣ fileRoutes.js
 ┃ ┣ processingRoutes.js
 ┃ ┗ miscRoutes.js
 ┣ app.js
 ┗ server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/AaryaBalwadkar/samrakshiq-backend.git
cd samrakshiq-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables  
Create a `.env` file in the project root:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

### 4️⃣ Run the server
```bash
npm run dev   # with nodemon
# OR
npm start
```

The server will run on `http://localhost:5000`.

---

## 🔑 API Endpoints

### **Auth**
- `POST /auth/login`  
  Request:  
  ```json
  { "username": "demo", "password": "demo123" }
  ```
  Response:  
  ```json
  { "token": "jwt_token_here" }
  ```

### **Files**
- `POST /files/upload` (requires Bearer token)  
  Upload a file via `multipart/form-data` with field `file`.

### **Processing**
- `POST /process/upload`  
  Upload a file and create a processing session.  
- `GET /process/:sessionId`  
  Get session status.

### **Misc**
- `GET /misc/fun-fact` → Returns a random fun fact.  
- `POST /misc/encrypt` → Encrypt a text using AES.  

---

## 🛠️ Tech Notes
- Uses **JWT** for auth (`Authorization: Bearer <token>`).
- Uploads are stored locally in `uploads/` directory.

---

## 📄 License
Apache 2.0 License
