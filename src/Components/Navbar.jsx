import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";
import {
  selectUserName,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName, navigate]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          toast.success("Login Successful!");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
          toast.success("Sign out Successful!");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false); 
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      <HamburgerIcon onClick={toggleMenu} aria-label="Toggle Menu">
        <span />
        <span />
        <span />
      </HamburgerIcon>

      <Menu isOpen={isMenuOpen}>
        <MenuItem>
          <Link to="/home" onClick={handleMenuClose}>
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about" onClick={handleMenuClose}>
            About
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/contact" onClick={handleMenuClose}>
            Contact
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profile" onClick={handleMenuClose}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleAuth}>
          {userName ? "Sign Out" : "Sign In"}
        </MenuItem>
      </Menu>

      <DesktopMenu>
        <MenuItem>
          <Link to="/home">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about">About</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/contact">Contact</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleAuth}>
          {userName ? "Sign Out" : "Sign In"}
        </MenuItem>
      </DesktopMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #090b13;
  position: relative;
`;

const Logo = styled.div`
  img {
    width: 80px;
  }
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 30px;
  cursor: pointer;

  span {
    width: 25px;
    height: 3px;
    background-color: white;
    border-radius: 5px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #090b13;
  width: 200px;
  padding: 10px;
  list-style-type: none;
  margin: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
`;

const MenuItem = styled.li`
  padding: 10px;
  color: white;
  cursor: pointer;
  text-align: center;
  list-style: none;

  &:hover {
    background-color: #333;
  }

  & a {
    text-decoration: none;
    color: white;
  }
`;

export default Navbar;
