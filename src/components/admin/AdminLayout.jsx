import React, { useState } from 'react'
import Sidebar from '../shared/Sidebar'
import { Outlet } from 'react-router-dom'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx';
import { FaBars } from 'react-icons/fa';

const AdminLayout = () => {
    let [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
        <Dialog 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            className="relative z-50 xl:hidden">
        
        <DialogBackdrop 
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

        <div className="fixed inset-0 flex">
          <DialogPanel 
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
                
           <TransitionChild>
            <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0'>
                <button type='button'
                 onClick={() => setSidebarOpen(false)}
                 className='-m-2.5 p-2.5'>
                    <span className='sr-only'> Close Sidebar</span>
                    <RxCross1 className='text-white text-2xl'/>
                </button>
            </div>
           </TransitionChild>
           <Sidebar />
          </DialogPanel>
        </div>
      </Dialog>




        <div className='hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col'>
            <Sidebar />
        </div>

        <div className='xl:pl-72'>
            <button
                type='button'
                onClick={() => setSidebarOpen(true)}
                className='fixed bottom-6 right-6 z-50 bg-dashboard-blue text-white xl:hidden p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300'>
                    <span className='sr-only'> Open Sidebar</span>
                    <FaBars className='text-2xl'/>
            </button>

            <main className=''>
                <div className='p-4 sm:p-6 xl:p-8'>
                    <Outlet />
                </div>
                
            </main>
        </div>
    </div>
  )
}

export default AdminLayout