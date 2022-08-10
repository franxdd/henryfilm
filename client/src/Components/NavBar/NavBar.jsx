import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../Styles/components/_NavBar.scss";
import {
  orderNameASC,
  orderNameDES,
  orderVoteAvgASC,
  orderVoteAvgDES,
  getIso,
  getIdioma,
  getUser,
  checkState,
  logOut,
} from "../../Redux/Actions/Actions";
import "../../Styles/components/_NavBar.scss";
import { BiHomeHeart as HomeIcon, BiCameraMovie as CamaraIcon } from "react-icons/bi";
import { MdAddShoppingCart as ShopIcon } from "react-icons/md";
import { FiMonitor as MonitorIcon } from "react-icons/fi";
import SearchBar from "../SearchBar/SearchBar";
import perfil from "../../img/perfil2.png";


function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}

const Nav2 = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  let navigate = useNavigate();
  let cart = useSelector((state) => state.cart);
  let deseado = useSelector((state) => state.wishlist);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("Estoy haciendo click");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log("Estoy haciendo click2");
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // const contexto = useContext(Context);
  const tokenString = getToken();

  // useEffect(() => {
  //   dispatch(getIso(parseInt(94605)));
  //   dispatch(getIdioma("a"));
  // }, [dispatch]);

  useEffect(() => {
    if (tokenString) {
      // console.log("entro al segundo useEffect");
      dispatch(getUser(tokenString));
    }
  }, [dispatch, token]);

  // const handleChangeLenguaje = (e) => {
  //   contexto.setLenguaje(e.target.value);
  // };
  // const b = useSelector((state) => state.idioma);
  // const c = useSelector((state) => state.isos);

  // function handleLenguage(e) {
  //   e.preventDefault();
  //   if (
  //     e.target.value === "en" ||
  //     e.target.value === "pt" ||
  //     e.target.value === "fr" ||
  //     e.target.value === "ch"
  //   ) {
  //     dispatch(getIdioma(e.target.value));
  //   }
  // }

  // **************************** ESTA COMENTADO PORQUE EL LOG OUT ESTA EN PROFILE ***********************************

  const HandleClick = (e) => {
    e.preventDefault();
    // console.log("entro a logout");

    const token = sessionStorage.getItem("token");
    const carro = cart.slice();
    const deseados = deseado.slice();
    const arrAux = [token, carro, deseados];

    // console.log("ASDASD", arrAux)

    dispatch(logOut(arrAux));
    sessionStorage.removeItem("token");
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("wishlist", JSON.stringify([]));
    // $crisp.push(['do', 'session:reset']);
    navigate("/home");
  };

  // **************************** ESTA COMENTADO PORQUE EL LOG OUT ESTA EN PROFILE ***********************************

  // return userReducer.isAdmin ? (
  return (
    <main>
      <AppBar position="static" sx={{ background: "black" }}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 5,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  color: "black",
                  boxShadow: "10px 10px #f000000",
                  textDecoration: "none",
                  paddingTop: "15px",
                }}
              >
                <Link className="logo" to={"/"}>
                  <img className="logo" src={logo} alt="Logo" height="auto" width="130px" />
                </Link>
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* <SearchBar style={{ color: "grey" }}/> */}

                <MenuItem>
                  <Link to="/home" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "black" }}>Inicio</Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/home/peliculas" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "black" }}>Peliculas</Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/home/series" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "black" }}>Series</Button>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "Open Sans",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  fontSize: "20px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <Link className="logo" to={"/"}>
                  <img className="logo" src={logo} alt="Logo" height="auto" width="100px" />
                </Link>
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", color: "white" },
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/home">
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white" }}>
                  {" "}
                  <HomeIcon className="iconoHome" />
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/home/peliculas">
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white" }}>
                  <CamaraIcon className="iconoHome" />
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/home/series">
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white" }}>
                  <MonitorIcon className="iconoHome" />
                </Button>
              </Link>
              <SearchBar sx={{ my: 2, color: "white" }} />
            </Box>

            <IconButton sx={{ mr: "6px", mt: "4px", p: "9px 6px 8px 6px" }}>
              <abbr title="Ver el carrito">
                <Link to="/home/carro" style={{ color: "grey" }}>
                  <ShopIcon className="iconoShop" />
                </Link>
              </abbr>
            </IconButton>

            {/* {userReducer.username ? ( */}
            {userReducer.username ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Abrir las opciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar src={userReducer?.img || "/broken-image.jpg"} /> */}
                
                    <img src={perfil} height="auto" width="40px" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/home/userProfile" style={{ textDecoration: "none", color: "black" }}>
                      <Typography textalign="center">Perfil</Typography>
                    </Link>
                  </MenuItem>
                  {!userReducer ? (
                    <></>
                  ) : userReducer.isAdmin ? (
                    <>
                      <MenuItem>
                        <Link to="/home/agregar" style={{ textDecoration: "none", color: "black" }}>
                          <Typography textaling="center">Agregar Producto</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/home/modificar" style={{ textDecoration: "none", color: "black" }}>
                          <Typography textaling="center">Modificar</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/home/wishlist" style={{ textDecoration: "none", color: "black" }}>
                          <Typography textaling="center">Favoritos</Typography>
                        </Link>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem>
                      <Link to="/home/wishlist" style={{ textDecoration: "none", color: "black" }}>
                        <Typography textaling="center">Favoritos</Typography>
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem>
                    {/* <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      logOut
                    > */}

                    {/* <Button  onClick={(e) => HandleClick(e)}>Logout<LogoutIcon /></Button> */}
                    {/* <Link to={"/home/Profile"}>
                 <Button sx={{ color: "black" }}>
                  {" "}
                  Logout <LogoutIcon sx={{ ml: "5px" }} />
                </Button>
              </Link> */}
                    {/* </Typography> */}
                  </MenuItem>
                </Menu>
                <Button sx={{ color: "white" }} onClick={(e) => HandleClick(e)}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Link style={{ textDecoration: "none", color: "white" }} to={"/home/Login"}>
                <Button sx={{ color: "white" }}> Login</Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <section>
        <Outlet />
      </section>
    </main>
  );
};
export default Nav2;
