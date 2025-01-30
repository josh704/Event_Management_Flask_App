from app import app, db
from models import Event, User, Registration
from datetime import datetime

def seed_db():
    with app.app_context():
        
        db.drop_all()
        db.create_all()

        event1 = Event(name="Tech Conference", description="A conference about tech.", date=datetime(2025, 5, 10, 9, 0), location="San Francisco, CA")
        event2 = Event(name="Music Festival", description="A large outdoor music festival.", date=datetime(2025, 6, 15, 16, 0), location="Los Angeles, CA")
        
        user1 = User(username="Alice", email="alice@gmail.com")  
        user2 = User(username="Bob", email="bob@gmail.com")      
        
        db.session.add_all([event1, event2, user1, user2])
        db.session.commit()  

        reg1 = Registration(event_id=event1.id, user_id=user1.id)
        reg2 = Registration(event_id=event2.id, user_id=user2.id)
        
        db.session.add_all([reg1, reg2])
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_db()
