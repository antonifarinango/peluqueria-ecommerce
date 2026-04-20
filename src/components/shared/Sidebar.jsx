import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { adminNavigation, sellerNavigation } from '../../utils';
import classNames from 'classnames';

const Sidebar = ({isProfileLayout = false}) => {
    const pathName = useLocation().pathname;
    const { user } = useSelector((state) => state.auth);

    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    const sideBarLayout = isAdmin ? adminNavigation : sellerNavigation;
    
  return (
    <div className='flex grow flex-col gap-y-7 overflow-y-auto bg-dashboard-blue px-6 w-55 pb-4'>
        <div className='mt-6 flex justify-center align-center'>
            <h1 className='text-white text-xl font-bold'>
                {isAdmin ? "Panel Admin" : "Panel Vendedor"}
            </h1>
        </div>
        <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                    <ul role='list' className='-mx-2 space-y-4'>
                        {sideBarLayout.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={classNames(
                                        pathName === item.href
                                            ? "bg-blue text-white"
                                            : "text-gray-400 hover:bg-on-blue hover:text-white",
                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                    )}>

                                        <item.icon className='text-2xl'/>
                                        {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Sidebar