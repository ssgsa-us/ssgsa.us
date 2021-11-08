import Image from "next/image";
import MainLayout from "../layouts/Main";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex">
        <div className="mx-4 sm:mx-12 lg:mx-20 mt-10">
          <h1 className="mb-8 bg-blue-850 lg:text-3xl text-2xl text-white font-extrabold py-2 pl-6 sm:pl-12 rounded-tl-3xl rounded-br-3xl">
            Sir Syed Ahmad Khan
          </h1>

          <div className="flex-1 flex flex-col md:flex-row justify-around text-black">
            <div className="self-center md:self-start my-2 mr-3 md:w-200 md:h-400 lg:w-350 lg:h-500 w-300 h-350 md:order-2">
              <Image
                src="/SirSyed.jpeg"
                width="300"
                height="350"
                alt="Sir Syed"
                layout="fixed"
              />
            </div>
            <div className="my-2 mx-4 sm:mx-8 lg:mx-16 md:order-1">
              <p>
                Sir Syed Ahmad Khan (1817-1898), was an influential Muslim
                educationist, philosopher, and social reformer in colonial
                India. Disillusioned by the poor social and educational status
                of Muslims in India, he devoted his life to reforming the
                landscape of the muslim community by promoting modern education
                and a rationalist political approach.
              </p>
              <br/>
              <p>
                His ideas materialized in the form of many educational
                institutions including but not limited to the Scientific
                Society of Aligarh, the first scientific association of its
                kind in India, as well as the internationally reputed Aligarh
                Muslim University (AMU). While his philosophical and
                intellectual endeavors continue to inspire generations of
                scholars globally, it is through the establishment of Mohammad
                Anglo-Oriental College (1875), which later became AMU,that he
                has made an everlasting contribution to the Indian education
                system.
              </p>
              <br/>
              <p>
                At the Sir Syed Education Society of North America, we feel
                privileged to have been influenced by his vision in the
                formative years of our careers at AMU.
              </p>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
