import unittest
import mongomock
import bcrypt

# Notice we no longer import 'client' because it's no longer global!
from models.user import User, register_user, retrieve_user

class TestUser(unittest.TestCase): 

    def setUp(self):
        """
        setUp runs before EACH test. 
        It creates a fresh, empty in-memory database, guaranteeing test isolation.
        """
        self.client = mongomock.MongoClient()
        self.db = self.client.test_db
        self.collection = self.db.test_users
        
        # Standard test user data
        self.test_username = "test_don"
        self.test_email = "test@dons.usfca.edu"
        self.test_password = "SuperSecretPassword123!"

    def test_register_success(self):
        # Pass the mock collection into the function
        success, msg = register_user(self.test_username, self.test_email, self.test_password, self.collection)
        
        self.assertTrue(success)
        self.assertEqual(msg, "ok")
        
        # Verify the database actually saved it
        saved_user = self.collection.find_one({"username": self.test_username})
        self.assertIsNotNone(saved_user)
        self.assertEqual(saved_user["email"], self.test_email)

    def test_register_fail_duplicate_username(self):
        # 1. Register the user once
        register_user(self.test_username, self.test_email, self.test_password, self.collection)
        
        # 2. Try to register the exact same username again (with a different email to isolate the username check)
        success, msg = register_user(self.test_username, "different@email.com", "Password!", self.collection)
        
        self.assertFalse(success)
        self.assertEqual(msg, "Username already exists")

    def test_retrieve_success(self):
        # 1. Manually insert a properly hashed user into the mock database
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(self.test_password.encode('utf-8'), salt)
        
        self.collection.insert_one({
            "userId": "test-uuid-1234",
            "username": self.test_username,
            "email": self.test_email,
            "password": hashed_password,
            "reviews": []
        })
        
        # 2. Attempt to retrieve the user
        logged_in_user = retrieve_user(self.test_username, self.test_password, self.collection)
        
        self.assertIsInstance(logged_in_user, User)
        self.assertEqual(logged_in_user.username, self.test_username)

    def test_retrieve_fail_wrong_password(self): 
        # 1. Pre-populate the database using the register method
        register_user(self.test_username, self.test_email, self.test_password, self.collection)
        
        # 2. Attempt login with the wrong password
        bad_login = retrieve_user(self.test_username, "WrongPassword!", self.collection)
        self.assertIsNone(bad_login)

    def test_retrieve_fail_nonexistent_user(self):
        # Attempt to retrieve a user from an empty database
        bad_login = retrieve_user("nobody", "Password123!", self.collection)
        self.assertIsNone(bad_login)

if __name__ == "__main__":
    unittest.main()