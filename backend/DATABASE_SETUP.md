# Database Setup Guide for XAMPP MySQL

## Step 1: Start XAMPP MySQL Server

1. Open XAMPP Control Panel
2. Start the **MySQL** service
3. Make sure it's running on port **3306** (default)

## Step 2: Create Database

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Click on "New" in the left sidebar
3. Enter database name: `tax_db` (or any name you prefer)
4. Select collation: `utf8mb4_general_ci`
5. Click "Create"

## Step 3: Configure Database Credentials

### Option 1: Update app.py directly
Edit `backend/app.py` and modify the `DB_CONFIG` dictionary:
```python
DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',           # XAMPP default username
    'password': '',           # XAMPP default password (empty)
    'database': 'tax_db'      # Your database name
}
```

### Option 2: Use environment variables (recommended)
1. Install python-dotenv: `pip install python-dotenv`
2. Create a `.env` file in the `backend` folder
3. Copy from `.env.example` and update values
4. Update `app.py` to load from `.env` file

## Step 4: Test the Connection

1. Make sure your Flask backend is running
2. Visit: http://localhost:5000/api/test-db
3. You should see a success message with MySQL version

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Check if you set a password for MySQL root user
- Update `DB_PASSWORD` in your configuration

### Error: "Unknown database 'tax_db'"
- Make sure you created the database in phpMyAdmin
- Check the database name matches in your configuration

### Error: "Can't connect to MySQL server"
- Make sure XAMPP MySQL is running
- Check if MySQL is running on port 3306
- Try `localhost` instead of `127.0.0.1` or vice versa

