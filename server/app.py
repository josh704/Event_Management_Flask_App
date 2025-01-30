from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS 
from models import db, Event, User, Registration
from datetime import datetime

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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

@app.route('/register', methods=['POST'])
def register_for_event():
    data = request.get_json()
    user = User.query.get_or_404(data['user_id'])
    event = Event.query.get_or_404(data['event_id'])

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
