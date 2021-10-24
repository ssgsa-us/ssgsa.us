import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [affiliation, setAffiliation] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className={styles.container}>
      <Header />
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-8 bg-blue-850 text-xl sm:text-2xl lg:text-3xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Interested in joining SSGSA? Get in touch with us!
          </h1>

          <div
            className="bg-red-850 rounded-3xl p-2"
          >
            <div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">Name</p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">Email</p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">Affiliation</p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Affiliation"
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">Subject</p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">Message</p>
                <textarea
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center">
                <button className="text-white text-base md:text-lg bg-blue-850 py-2 px-4 rounded-3xl">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
