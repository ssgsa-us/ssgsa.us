import emailjs from 'emailjs-com'
import { useState } from 'react'
import MainLayout from '../layouts/Main'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const sendEmail = (e) => {
    setError('')
    setSuccess('')
    e.preventDefault()

    if (name && email && affiliation && subject && message) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        const templateParams = {
          name: name,
          email: email,
          affiliation: affiliation,
          subject: subject,
          message: message,
        }

        emailjs
          .send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.EMAILJS_USER_ID,
          )
          .then(() => {
            setSuccess(
              'We have recieved your mail and will contact you as soon as possible.',
            )
          })
          .catch(() => {
            setError('Some Error Occured. Try Again!')
          })
      } else {
        setError('Email should be valid.')
      }
    } else {
      setError('All Fields Are Required.')
    }
  }

  return (
    <MainLayout>
      <div className="mx-4 sm:mx-12 lg:mx-20 mt-10 flex justify-center">
        <div>
          <h1 className="mb-4 bg-blue-850 text-xl sm:text-xl lg:text-2xl text-center text-white font-extrabold py-2 px-6 sm:px-12 rounded-tl-3xl rounded-br-3xl">
            Interested in joining SSGSA? Get in touch with us!
          </h1>

          {error ? (
            <div className="bg-red-200 rounded-3xl p-2 pl-6 mb-2">
              <p>
                <span className="font-bold">Error:</span> {error}
              </p>
            </div>
          ) : null}

          {success ? (
            <div className="bg-green-600 rounded-3xl p-2 pl-6 mb-2">
              <p className="text-white">
                <span className="font-bold">Sent:</span> {success}
              </p>
            </div>
          ) : null}

          <div className="bg-red-850 rounded-3xl p-2">
            <div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                  Name
                </p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                  Email
                </p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                  Affiliation
                </p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Affiliation"
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                  Subject
                </p>
                <input
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-4 m-4">
                <p className="col-span-2 sm:text-right text-white text-base md:text-lg">
                  Message
                </p>
                <textarea
                  className="col-span-7 sm:col-span-4 p-1 rounded"
                  name="Message"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="text-white text-base md:text-lg bg-blue-850 py-2 px-4 rounded-3xl"
                  onClick={sendEmail}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
