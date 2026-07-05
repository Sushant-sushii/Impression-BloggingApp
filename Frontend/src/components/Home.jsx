import { RiHomeFill,RiBallPenFill,RiGitRepositoryFill,RiSettingsFill } from "@remixicon/react";
import logo from "../assets/logo.png"
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  const navItems = [
    { id: 'home', to: 'feed', icon: RiHomeFill },
    { id: 'blog', to: 'blog', icon: RiBallPenFill },
    { id: 'myBlogs', to: 'my-blogs', icon: RiGitRepositoryFill },
    { id: 'setting', to: 'setting', icon: RiSettingsFill },
  ]

  return (
    <div className='bg-[#C9C8C7] h-screen w-full flex flex-col-reverse '>
      <div className='flex items-end h-full w-screen justify-center'>
        <div className='p-10 rounded-t-3xl bg-[#0A2184] navbar flex justify-around items-center h-9 w-full'>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `m-2 ${isActive ? 'text-[#E1790D]' : 'text-white'} hover:text-[#E1790D]`
                  }
                >
                  <Icon size={30} />
                </NavLink>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex-1 bg-[#C9C8C7] w-full p-6">
        <Outlet />
      </div>
      <div className="p-12  z-4 bg-[#0A2184] navbar flex justify-around items-center h-12 w-full">
        <h2 className="text-white font-[impression] text-3xl"><img className="h-9 inline pr-3" src={logo} alt="logo" />Impressions</h2>
      </div>
    </div>
  )
}

export default Home
