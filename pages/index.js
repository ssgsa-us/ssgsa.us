import Head from 'next/head'
import Image from 'next/image'
import Datetable from '../components/Datetable'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Datetable/>
    </div>
  )
}
