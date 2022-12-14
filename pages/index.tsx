import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { userService } from '../components/services/userService';

export default function Home() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
      userService.getAll().then(x => setUsers(x));
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Agora Agents</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Agoras Next Js Tutorials </a>
        </h1>
        <h4 className="card-header">You're logged in with Next.js 11 & JWT!!</h4>
            <div className="card-body">
                <h6>Users from secure api end point</h6>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
                {!users && <div className="spinner-border spinner-border-sm"></div>}
            </div>
      </main>

    

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
