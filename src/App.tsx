import './App.css';
import { useUserStore } from './store/store';

function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  const handleLogin = () => {
    const userData = { name: 'Ricardo Espinoza', email: 'ricardo@example.com' };
    setUser(userData);
  };

  return (
    <div style={{ padding: '20px' }}>
      {user ? (
        <div>
          <h1>Bienvenido, {user.name}</h1>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
}

export default App;
