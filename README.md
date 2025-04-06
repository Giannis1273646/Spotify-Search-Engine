# 🎧 Spotify Search Engine

A modern search engine for Spotify content, built with **React JS** and the **Spotify Web API**. Easily search for **artists, tracks, albums, playlists, shows, and episodes**, and explore your listening history in a clean, user-friendly interface.

## 🚀 Features

- **Spotify Login Integration**  
  Securely log in with your Spotify account through our custom login page.

- **New Releases on Home Page**  
  After logging in, you'll land on a home screen showcasing the latest album releases.

- **User Profile Integration**  
  View your Spotify profile picture and username on the top right of the app.

- **Navigation Menu**  
  Access your saved playlists or log out with a simple dropdown menu.

- **Powerful Search Engine**  
  Search across multiple content types (artists, tracks, albums, playlists, shows, episodes).  
  - View **top results** per category  
  - See **detailed info** about each item  
  - Get **suggestions** based on your query  

- **Search History & Suggestions**  
  Every search is saved in your personal history, which you can view or delete.  
  - The app uses your history to provide **auto-complete suggestions** for future searches.

---

## 📸 Preview  
![Screenshot 2025-04-06 174447](https://github.com/user-attachments/assets/761a96a0-3923-49b6-99ba-c988b6f81d44)
![Screenshot 2025-04-06 174652](https://github.com/user-attachments/assets/64a25a0b-cff4-4824-9484-ce0c13ccf0e2)
![Screenshot 2025-04-06 174758](https://github.com/user-attachments/assets/b76b734f-5050-4692-8b9a-575ad0f7195a)
![Screenshot 2025-04-06 174951](https://github.com/user-attachments/assets/bd5fa8b9-179c-42cf-9842-12dde61d84aa)

---

## 🛠️ Tech Stack

- **Frontend**: React JS  
- **API**: Spotify Web API  
- **Authentication**: OAuth with Spotify  
- **Database**: MySQL

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/spotify-search-engine.git
cd music_player
```

---

### 2. Set Up the Backend (Node.js + MySQL)

1. Navigate to the `server/` folder:
   ```bash
   cd server
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `server/` and configure it:
   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   ```

4. Start the backend server:
   ```bash
   node db.js
   ```
   > The server will run on **http://localhost:5000** (or your configured port).
