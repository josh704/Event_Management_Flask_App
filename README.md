**Event Management System**
A web application to manage events, users, and registrations built with Flask (backend) and React (frontend).

**Features**
Create, read, update, and delete events
Register users and manage event registrations
Technologies Used
Backend: Flask, Flask-SQLAlchemy
Frontend: React
Database: PostgreSQL
Setup
1. Clone the repository
bash
Copy
git clone https://github.com/your-username/event-management-system.git
cd event-management-system
2. Install Backend Dependencies
bash
Copy
# Set up a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt
3. Configure Database
Create a .env file with the following:

bash
Copy
DATABASE_URI=postgresql://username:password@localhost/dbname
4. Initialize the Database
bash
Copy
flask db init
flask db migrate
flask db upgrade
5. Start Backend Server
bash
Copy
python app.py
6. Set up Frontend (React)
Go to the client directory:
bash
Copy
cd client
Install dependencies:
bash
Copy
npm install
Start the React server:
bash
Copy
npm start
**License**
This project is licensed under the MIT License
**Deplyoment**
https://event-management-flask-app.onrender.com
https://eventmanagementfrontend123.netlify.app
