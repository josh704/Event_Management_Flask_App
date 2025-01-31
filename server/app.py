import os
print("Current working directory:", os.getcwd())
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS 
from server.models import db, Event, User, Registration
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

# Initialize the Flask app
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Setup database URI from environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'postgresql://event_management_db_ryil_user:s2NqNTqRhbndWCsKqOtqwViSVaQYnWtm@dpg-cudtnnrqf0us73foalrg-a.oregon-postgres.render.com/event_management_db_ryil')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the SQLAlchemy and Migrate instances
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,  
        'location': event.location
    } for event in events])

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()

    if not data.get('name') or not data.get('description') or not data.get('location'):
        return jsonify({'error': 'Missing required fields'}), 400

    event_date = data.get('date')

    if not event_date:
        return jsonify({'error': 'Missing date for the event'}), 400
    try:
        formatted_date = datetime.strptime(event_date, '%Y-%m-%d').strftime('%a, %d %b %Y')
    except ValueError:
        return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD.'}), 400

    new_event = Event(
        name=data['name'],
        description=data['description'],
        date=formatted_date, 
        location=data['location']
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({'message': 'Event created successfully!'}), 201

@app.route('/event/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({
        'id': event.id,
        'name': event.name,
        'description': event.description,
        'date': event.date,  
        'location': event.location
    })

@app.route('/event/<int:event_id>', methods=['PATCH'])
def update_event(event_id):
    event = Event.query.get_or_404(event_id)
    data = request.get_json()

    if 'name' in data:
        event.name = data['name']
    if 'description' in data:
        event.description = data['description']
    
    if 'date' in data:
        event_date = data['date']
        try:
            formatted_date = datetime.strptime(event_date, '%Y-%m-%d').strftime('%a, %d %b %Y')
            event.date = formatted_date
        except ValueError:
            return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD.'}), 400

    if 'location' in data:
        event.location = data['location']

    db.session.commit()
    return jsonify({'message': 'Event updated successfully!'})

@app.route('/event/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully!'})

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    # Validate incoming data
    if not data.get('username') or not data.get('email'):
        return jsonify({'error': 'Username and email are required'}), 400

    # Check if the username already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400
    
    # Create the new user
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Fetch all users from the database
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email
    } for user in users])

@app.route('/register', methods=['POST'])
def register_for_event():
    data = request.get_json()
    
    # Ensure both user_id and event_id are provided
    if not data.get('user_id') or not data.get('event_id'):
        return jsonify({'error': 'Missing user_id or event_id'}), 400
    
    # Fetch the user and event objects from the database
    user = User.query.get_or_404(data['user_id'])
    event = Event.query.get_or_404(data['event_id'])
    
    # Check if the user is already registered for the event
    existing_registration = Registration.query.filter_by(user_id=user.id, event_id=event.id).first()
    if existing_registration:
        return jsonify({'error': 'User already registered for this event'}), 400
    
    # Create the registration and add to the session
    registration = Registration(user_id=user.id, event_id=event.id)
    db.session.add(registration)
    db.session.commit()

    return jsonify({'message': 'Registration successful!'})

@app.route('/user/<int:user_id>/events', methods=['GET'])
def get_user_events(user_id):
    user = User.query.get_or_404(user_id)
    registrations = Registration.query.filter_by(user_id=user.id).all()
    events = [reg.event for reg in registrations]
    
    return jsonify([{
        'id': event.id,
        'name': event.name,
        'date': event.date,
        'location': event.location
    } for event in events])


if __name__ == '__main__':
    app.run(debug=True)
