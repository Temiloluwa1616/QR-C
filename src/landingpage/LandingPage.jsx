import Sharednav from "../QR Code/Sharednav"
import Button from "../btn/Button"

function LandingPage(){
  return(
    <Sharednav>
    <div className=" flex h-screen bg-[#3a3a3a]">
           <div className='w-[50%]'>
         <div className='py-[8.4rem] pl-[6rem]'>
           
                <h1 className=" text-[2rem] w-[30rem] font-bold  text-white">Creating is Allowing Yourself Make  <span className="bg-[#32bb78] text-white px-3 rounded-xl">Mistakes</span></h1>
                <p  className="text-[18px] w-[30rem] mt-12 font-normal  text-white sm:text-[18px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis, 
                    ad vero perferendis illum qui? Sit, inventore quisquam unde numquam tempora.</p>

                    <Button
          text="Get Started"
          className="text-white font-medium bg-[#32bb78] mt-11 hover:text-blue-500 rounded-xl p-[.4rem]"
        />

            
         </div>

         </div>

         <div className="w-[50%] bg-Dev bg-cover bg-no-repeat">

         </div>
    </div>
    </Sharednav>
  )
}

export default LandingPage