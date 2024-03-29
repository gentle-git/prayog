import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

const Student = () => {
  const {name,college,degree,projects} = useSelector((state:RootState) => state.user.details);
  const navigate = useNavigate();
  return (
    <div className="py-10 min-h-screen bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
      <section className="bg-slate-300 text-black text-lg font-medium mx-10 pb-5 rounded shadow ">
        <p className="mb-5 text-center text-2xl font-semibold">Profile</p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-0">
          <div className="w-100 flex md:flex-row flex-col justify-center items-center gap-5">
            <div className="flex justify-center items-center">
              <img className="h-40 w-40" src="/images/user.png" alt="" />
            </div>
            <div className="text-center md:text-start">
              <p>{name}</p>
              <p>{college}</p>
              <p>{degree}</p>
            </div>
          </div>
          <div className="px-3 text-center md:text-start">
            <p className="text-xl text-center font-semibold mb-3">Projects Uploaded</p>
            <p className="text-center text-3xl">
              {projects}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-evenly">
            <Link to='add' className=" cursor-pointer w-40 text-center border border-green-500 hover:bg-green-500 active:scale-95 px-2 py-1 rounded-md transition-colors">Add New Project</Link>
            <Link to='edit' className=" cursor-pointer w-40 text-center border border-yellow-400 hover:bg-yellow-500 active:scale-95 px-2 py-1 rounded-md transition-colors">Edit Profile</Link>
            <p className=" cursor-pointer w-40 text-center border border-red-500 hover:bg-red-500 active:scale-95 px-2 py-1 rounded-md transition-colors">Delete Account</p>
          </div>
        </div>
      </section>
      <br />
      <section className="px-10">
        <p className="text-orange-500 text-2xl text-center underline underline-offset-8">My Projects</p>
        <div className=' py-3  flex flex-col md:flex-row gap-3 justify-evenly items-center'>
          {Array.from({ length: 4 }, (_, i) => (
            <article
              onClick={() => navigate('/projects/qazwsxedc')}
              key={i}
              className="py-4 px-2 grid md:grid-cols-2 border border-lightTheme-primary dark:border-darkTheme-primary    rounded hover:shadow-lg cursor-pointer"
            >
              <div className='md:order-2'>
                <img src="/images/p1.jpg" sizes='' alt="..." />
              </div>
              <div className='md:order-1'>
                <div className="flex flex-col ">
                  <h5 className="text-2xl">Self Directoning Rover</h5>
                  <p className="text-base line-clamp-3">
                    Arduino-powered self-directing rover is an autonomous vehicle project. It uses Arduino microcontrollers,
                    sensors, and programming to navigate and adapt to its environment independently, offering an engaging and
                    educational experience in robotics.
                  </p>
                  <p className=""><small>Electronics</small></p>
                  <p className=""><small>22-3-2023</small></p>
                  <p className=""><small>{22} Views</small></p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="py-2">
          <Link to='/profile/projects' className="flex justify-center border py-2  hover:scale-105 active:scale-95">
            <p className="">View All</p>
          </Link>
        </div>
      </section>
      <br />
      <p className="text-center text-2xl ">More Features Coming Soon...</p>
    </div>
  )
}
export default Student