# test_backend.py
from backend.models.user import User, register_user, retrieve_user

def run_tests():
    print("--- Starting Backend Tests ---")
    
    # 1. Create a dummy user
    test_user = User(
        userId="",
        username="test_don",
        email="test@dons.usfca.edu",
        password="SuperSecretPassword123!",
        reviews=[]
    )
    
    # 2. Test Registration
    print("\nTesting Registration...")
    success, msg = register_user(test_user)
    print(f"Register result: Success={success}, Message='{msg}'")
    
    # 3. Test Duplicate Registration (Should fail)
    print("\nTesting Duplicate Registration...")
    success, msg = register_user(test_user)
    print(f"Duplicate Register result: Success={success}, Message='{msg}'")
    
    # 4. Test Login (Success)
    print("\nTesting Successful Login...")
    logged_in_user = retrieve_user("test@dons.usfca.edu", "SuperSecretPassword123!")
    if logged_in_user:
        print(f"Login Success! Welcome {logged_in_user.username}")
    else:
        print("Login Failed unexpectedly!")
        
    # 5. Test Login (Wrong Password)
    print("\nTesting Wrong Password Login...")
    bad_login = retrieve_user("test@dons.usfca.edu", "WrongPassword!")
    if bad_login is None:
        print("Login correctly rejected the wrong password.")
    else:
        print("Security flaw: Logged in with wrong password!")

if __name__ == "__main__":
    run_tests()