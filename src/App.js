import { MessengerPage } from './routes/messenger-page/messenger-page.component';
import { useEffect, useState } from 'react';
import { onAuthStateChangedListener } from './utils/firebase/firebase';
import './App.css';
import { LoginPage } from './routes/login-page/login-page.component';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
          setUser(user);
      });

      return unsubscribe;
  }, []);
 
  return (
    <div>
      {user ? <MessengerPage user={user}/> : <LoginPage />}
    </div>
  );
}

export default App;
