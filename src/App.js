import styles from './app.module.scss'
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className={styles.background}>
      <Navbar></Navbar>
    </div>
  );
}

export default App;
