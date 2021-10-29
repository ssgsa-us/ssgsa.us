import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    
    <div className={styles.container}>
      <Header />
      
      
       <div className="flex">
           
          <div className="flex-1 mx-4 sm:mx-12 lg:mx-20 mt-10 lg:flex justify-around text-black ">
     
            <div>
               <h1 className="mb-8 bg-blue-850 lg:text-3xl text-2xl text-white font-extrabold py-2 pl-6 sm:pl-12 rounded-tl-3xl rounded-br-3xl ">
                   Sir Syed Ahmad Khan
               </h1>

               <div className="mx-4 sm:mx-8 md:mx-16">
                 <p>
                    Sir Syed Ahmad Khan (1817-1898), was an influential Muslim educationist, 
                    philosopher, and social reformer in colonial India. Disillusioned by the 
                    poor social and educational status of Muslims in <br/> India, he devoted his life 
                    to reforming the landscape of the muslim community by promoting <br/> modern 
                    education and a rationalist political approach. <br/>
                  </p>
              
                  <p>
                  <br/> His ideas materialized in the form of many educational institutions 
                        including but not limited to <br/> the Scientific Society of Aligarh, the 
                        first scientific association of its kind in India, as well as the 
                        internationally reputed Aligarh Muslim University (AMU). While his 
                        philosophical and intellectual endeavors continue to inspire 
                        generations of scholars globally, it is through the establishment <br/> of 
                        Mohammad Anglo-Oriental College (1875), which later became AMU,that 
                        he has made an everlasting contribution to the Indian education system. <br/> 
                  </p>

                  <p>
                        <br/> At the Sir Syed Education Society of North America, we feel privileged to have 
                        been influenced by <br/> his vision in the formative years of our careers at AMU <br/>

                  </p>

       
          
                </div>
    
            </div>

          </div>
          <img className="mt-10 px-7 w-64 md:w-72 lg:w-80 md:flex1" src="/SirSyed.jpeg"></img>
              
                 
        </div>
     <Footer />
    </div>

  );
}