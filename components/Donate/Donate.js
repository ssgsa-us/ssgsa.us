const Donate = () => {
  return (
    <div className="mx-8 sm:mx-12 lg:mx-12 mt-10 justify-center">
      <div>
        <h1 className="bg-blue-850 flex font-extrabold justify-center lg:text-xl m-auto mb-8 px-6 py-2 rounded-br-3xl rounded-tl-3xl sm:px-12 sm:text-xl text-center text-white text-xl w-0">
          Donate
        </h1>
      </div>
      <div className="mb-8 flex justify-center">
        {/* //make div inside of div which should contain form below it */}
        <div className="bg-grey-850 rounded-lg shadow-lg w-96">
          <div className="justify-center">
            <p className="text-black text-sm font-bold py-2 px-6">
              Our Contribution towards the world around us
            </p>
          </div>
          <div className="justify-center">
            <p className="text-blue-500 py-2 px-6">
              "We are all part of a larger society, and it is our duty to
              contribute to the betterment of the world around us."
            </p>
          </div>
          <div className="justify-center">
            <p className="text-red-600 text-sm font-bold py-2 px-6">
              -Sir Syed Ahmed Khan
            </p>
            <hr className="border-t-2 border-blue-800 my-4 py-2"></hr>
          </div>

          <div className="flex justify-center">
            <form className="bg-pink p-8 rounded-lg shadow-lg w-96">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <p className="text-red-900 text-sm font-bold px-6">
                    *Required
                  </p>
                  <label
                    className="block uppercase tracking-wide text-red-800 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Donation Type: *
                  </label>
                  <button
                    className="border border-black md:text-lg px-4 text-base text-black"
                    onClick={() => null}
                  >
                    <p className="ml-2">One-Time</p>
                  </button>
                  <button
                    className="border border-black md:text-lg px-1 text-base text-black"
                    onClick={() => null}
                  >
                    <p className="ml-2">Monthly Recurring</p>
                  </button>
                  <div>
                    <label
                      className="block uppercase tracking-wide text-red text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Select Amount: *
                    </label>
                    <button
                      className="border border-black md:text-lg px-1 text-base text-black"
                      onClick={() => null}
                    >
                      <p className="ml-2">$10</p>
                    </button>
                    <button
                      className="border border-black md:text-lg px-1 text-base text-black"
                      onClick={() => null}
                    >
                      <p className="ml-2">$20</p>
                    </button>
                    <button
                      className="border border-black md:text-lg px-1 text-base text-black"
                      onClick={() => null}
                    >
                      <p className="ml-2">$50</p>
                    </button>
                    <button
                      className="border border-black md:text-lg px-1 text-base text-black"
                      onClick={() => null}
                    >
                      <p className="ml-2">$100</p>
                    </button>
                  </div>
                  <div>
                    <label
                      className="block uppercase tracking-wide text-red text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Or enter your own:
                    </label>
                    <div className="display: inline-flex">
                      <input
                        className="appearance-none block w-full bg-black-850 text-white border border-black-850 rounded px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-password"
                        type="text"
                        placeholder="Currency"
                        readOnly
                      />
                      <input
                        className="appearance-none block w-full bg-grey-850 text-black border border-grey-850 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-password"
                        type="text"
                        placeholder="Amount"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block uppercase tracking-wide text-red text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Name: *
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-850 text-white border border-grey-850 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-password"
                      type="text"
                      placeholder="John Doe"
                    />

                    <label
                      className="block uppercase tracking-wide text-red text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Email: *
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-850 text-white border border-grey-850 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-password"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className="display: inline-flex">
                    {/* //create a checkbox here */}
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      value="anonymous_user"
                    />
                    <p>Keep me anonymous</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="text-blue text-sm font-bold py-2 px-6">
                  Pay with:{' '}
                </p>
              </div>
              <div className="flex justify-center">
                <button className="bg-red-850 hover:bg-red-700 text-white font-bold py-1 px-2 mx-1 rounded-full">
                  Credit Card
                </button>
                <button className="bg-red-850 hover:bg-red-700 text-white font-bold py-1 px-2  mx-1 rounded-full">
                  Paypal
                </button>
                <button className="bg-red-850 hover:bg-red-700 text-white font-bold py-2 px-2  mx-1 rounded-full">
                  Venmo
                </button>
                <button className="bg-red-850 hover:bg-red-700 text-white font-bold py-2 px-2  mx-1 rounded-full">
                  Zelle
                </button>
              </div>
            </form>
          </div>

          <div className="justify-center">
            <p className="text-black text-sm font-bold py-2 px-6">
              By supporting students, you are becoming an active participant in
              building their careers. All donations and contributions directly
              sponsor the attempts of talented students to secure admission in a
              Masters or PhD program at a university of international repute.
              You can easily cancel or upgrade your contribution at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
