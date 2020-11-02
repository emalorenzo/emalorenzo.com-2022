import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      {process.env.BASE_URL}
    </Head>
  </div>
);

export default Home;
