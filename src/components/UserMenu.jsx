import { Menu, MenuItem } from '@mui/material';
import React from 'react'
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart, FaUserShield, FaUser } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BackDrop from './BackDrop';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
  const isSeller = user && user?.roles.includes("ROLE_SELLER");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <div className='relative z-30'>
      <div
        className='flex flex-row items-center gap-1 rounded-full cursor-pointer transition'
        onClick={handleClick}
      >
          <FaUser color="black" size={25}/>
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { width: 160 },
        }}
      >

      {/*  <Link to="/profile">
          <MenuItem className="flex gap-2"
            onClick={handleClose}>
            <BiUser className='text-xl' />
            <span className='font-bold text-[16px] mt-1'>
              {user?.username}
            </span>
          </MenuItem>
        </Link>

        <Link to="/profile/orders">
          <MenuItem className="flex gap-2"
            onClick={handleClose}>
            <FaShoppingCart className='text-xl' />
            <span className='font-semibold'>
              Order
            </span>
          </MenuItem>
        </Link>

        */}

        {(isAdmin || isSeller) && (
          <Link to={isAdmin ? "/admin" : "/admin/orders"}>
            <MenuItem className="flex gap-2"
              onClick={handleClose}>
              <FaUserShield className='text-xl' />
              <span className='font-semibold'>
                {isAdmin ? "Panel Admin" : "Panel Vendedor"}
              </span>
            </MenuItem>
          </Link>)}

   <MenuItem className="w-full"
          onClick={logOutHandler}>
            <div className='bg-danger w-full flex justify-center px-2 py-2 rounded-[10px] text-white cursor-pointer'>
            <span className='font-bold text-[16px]'>
              Cerrar Sesión
            </span>
            </div>
            
        </MenuItem>
       

      </Menu>

      {open && <BackDrop />}
    </div>
  );
}

export default UserMenu