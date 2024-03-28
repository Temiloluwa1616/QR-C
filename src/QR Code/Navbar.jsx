import nithub from '../assets/nit.png'
import Button from '../btn/Button'
import { Link } from 'react-router-dom'

function Navbar(){
  return(
    <div className='flex justify-between items-center px-[2rem] py-[1rem] fixed w-full'>
      <div className='flex items-center gap-[26rem]'>
        <img src={nithub} alt="" width={150}/>

        <div className='flex items-center gap-[18rem]'>
          <ul className='flex gap-8 text-[20px] font-semibold text-center items-center text-white mt-3'>
            <Link to= "/client">
            <li>
              Client
            </li>
            </Link>
            <Link to="/student">
            <li>
              Student
            </li>
            </Link>
            <Link to="visitor">
            <li>
            Visitor
            </li>
            </Link>
            <li>

            </li>
          </ul>

          <div className='ml-[] flex gap-4'>
            <Link to="interns">
          <Button
          text="Intern"
          className="bg-white font-semibold p-3 rounded-2xl"/>
          </Link>

          <Link to="AdminSignup">
          <Button
          text="Staffs"
          className="bg-white font-semibold p-3 rounded-2xl"/>
          </Link>
        </div>
        </div>
        
        


      </div>
    </div>
  )
}

export default Navbar