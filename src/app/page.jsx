"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
        router.push('/feed')
    );
  }

  return (
    <div className={styles.container}>
      
        <div className={styles.imageContainer}>
          <Image
            src="/images/fui.png"
            width={400}
            height={400}
            alt="Work Follow-Up"
          />
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>Work Follow-Up</h1>
        </div>
        <div className={styles.center}>
          <Button className={styles.buttons} variant="contained" onClick={() => signIn()}>
            Login
          </Button>
        </div>
        
    </div>
  );
}
