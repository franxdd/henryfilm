import {
  GET_ALL_SERIES,
  GET_ALL_MOVIES,
  GET_SERIES_DETAIL,
  GET_MOVIES_DETAIL,
  WILLUNMOUNT,
  ORDER_NAME_ASC,
  ORDER_NAME_DES,
  ORDER_VOTE_AVG_ASC,
  ORDER_VOTE_AVG_DES,
  GET_GENEROS_SERIES,
  GET_GENEROS_MOVIES,
  FILTRO_GENERO_MOVIES,
  FILTRO_GENERO_SERIES,
  FILTRO_GENERO_MOVIES_REVERSA,
  FILTRO_GENERO_SERIES_REVERSA,
  WILLUNMOUNT2,
  GET_NAME_MOVIES,
  GET_NAME_SERIES,
  GET_TODO,
  FILTER_NAME,
  POST_PELICULAS,
  ADD_TO_CART,
  REMOVE_TO_CART,
  GET_LENGUAJE,
  ENGLISH,
  GET_ISOS,
  POST_USUARIOS,
  POST_LOGIN,
  GET_USER,
  CHECK_STATE,
  LOG_OUT
} from "../Actions/Actions.js";

import { filterGenres } from "../../util/filter.js";
import { toast } from "react-toastify";

function a() {
  return toast.error("Ya se encuentra en el carro", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
function b() {
  return toast.success("Fue añadida al carro", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

let cartStorage;
try {
  let local = localStorage.getItem("cart") || [];
  if (local !== "undefined") {
    console.log(local);
    cartStorage = JSON.parse(local);
  }
} catch (error) {
  console.log(error);
}

if (!cartStorage) {
  cartStorage = [];
}

const initialState = {
  allMovies: [],
  allSeries: [],
  movieDetail: {},
  seriesDetail: {},
  backupSeries: [],
  backupMovies: [],
  generosMovies: [],
  generosSeries: [],
  errores: [],
  all: [],
  todo: [],
  backupTodo: [],
  cart: cartStorage,
  current: null,
  idioma: [],
  idiomaDefault: "es/ES",
  isos: [],
  user:[],
  token: '',
};

const rootRouter = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SERIES:
      return {
        ...state,
        allSeries: action.payload,
        backupSeries: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: [], 
        token: ''

      }
    
    case POST_USUARIOS:
      return{
        ...state,

      }
    case POST_LOGIN:

      return{
        ...state,
        token: action.payload
      }
    case CHECK_STATE:
      return{

        ...state,
      }
    
      case GET_USER:
        return{
          ...state,
          user: action.payload
        }

    case GET_ALL_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
        backupMovies: action.payload,
      };
    case GET_NAME_SERIES:
      return {
        ...state,
        allSeries: action.payload,
      };
    case GET_NAME_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
      };
    case GET_SERIES_DETAIL:
      return {
        ...state,
        seriesDetail: action.payload,
      };
    case GET_MOVIES_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };

    case POST_PELICULAS:
      return {
        ...state,
        errores: action.payload,
      };
    case WILLUNMOUNT:
      return {
        ...state,
        lenguaje: {},
      };
    case WILLUNMOUNT2:
      return {
        ...state,
        movieDetail: {},
      };

    case ORDER_NAME_ASC:
      let new_arrayAsc = action.payload.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      if (action.payload[0].tipo === "pelicula") {
        return {
          ...state,
          allMovies: [...new_arrayAsc],
        };
      } else if (action.payload[0].tipo === "serie") {
        return {
          ...state,
          allSeries: [...new_arrayAsc],
        };
      }
      break;
    case ORDER_NAME_DES:
      let new_arrayDes = action.payload.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        }
        return 0;
      });

      if (action.payload[0].tipo === "pelicula") {
        return {
          ...state,
          allMovies: [...new_arrayDes],
        };
      } else if (action.payload[0].tipo === "serie") {
        return {
          ...state,
          allSeries: [...new_arrayDes],
        };
      }
      break;
    case ORDER_VOTE_AVG_ASC:
      let new_arrayVoteDes = action.payload.sort((a, b) => {
        if (a.vote_average > b.vote_average) {
          return -1;
        } else if (a.vote_average < b.vote_average) {
          return 1;
        }
        return 0;
      });

      if (action.payload[0].tipo === "pelicula") {
        return {
          ...state,
          allMovies: [...new_arrayVoteDes],
        };
      } else if (action.payload[0].tipo === "serie") {
        return {
          ...state,
          allSeries: [...new_arrayVoteDes],
        };
      }
      break;
    case ORDER_VOTE_AVG_DES:
      let new_arrayVoteAsc = action.payload.sort((a, b) => {
        if (a.vote_average > b.vote_average) {
          return 1;
        } else if (a.vote_average < b.vote_average) {
          return -1;
        }
        return 0;
      });

      if (action.payload[0].tipo === "pelicula") {
        return {
          ...state,
          allMovies: [...new_arrayVoteAsc],
        };
      } else if (action.payload[0].tipo === "serie") {
        return {
          ...state,
          allSeries: [...new_arrayVoteAsc],
        };
      }
      break;
    case GET_GENEROS_MOVIES:
      return {
        ...state,
        generosMovies: action.payload.genres,
      };
    case GET_GENEROS_SERIES:
      return {
        ...state,
        generosSeries: action.payload.genres,
      };

    case FILTRO_GENERO_MOVIES:

      
      const arrAuxMovies = filterGenres(state.allMovies, action.payload);
      if (arrAuxMovies.length === 0) {
        alert("No se encontraron coincidencias");

        return {
          ...state,
          allMovies: state.backupTodo.slice(0,100),
        };
      } else {
        return {
          ...state,
          allMovies: arrAuxMovies ,
        };
      }

    case FILTRO_GENERO_SERIES:

      const arrAuxSeries = filterGenres(state.allSeries, action.payload);
      if (arrAuxSeries.length === 0) {
        alert("No se encontraron coincidencias");
        return {
          ...state,
          allSeries: state.backupTodo.slice(100,200),
        };
      } else {
        return {
          ...state,
          allSeries: arrAuxSeries,
        };
      }

    case FILTRO_GENERO_MOVIES_REVERSA:
   
      const arrMovie = filterGenres(state.backupTodo.slice(0,100), action.payload);
      if (arrMovie.length === 0) {
        return {
          ...state,
          allMovies: state.backupTodo.slice(0,100),
        };
      } else {
        return {
          ...state,
          allMovies: arrMovie,
        };
      }

    case FILTRO_GENERO_SERIES_REVERSA:
      const arrSeries = filterGenres(state.backupTodo.slice(100,200), action.payload);
      if (arrSeries.length === 0) {
        return {
          ...state,
          allSeries: state.backupTodo.slice(100,200),
        };
      } else {
        return {
          ...state,
          allSeries: arrSeries,
        };
      }
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
        backupTodo: action.payload,
        allMovies: action.payload.slice(0,100),
        allSeries : action.payload.slice(100,200)


      };
    case FILTER_NAME:
      if (action.payload.length === 0) {
        return {
          ...state,
          todo: state.backupTodo,
        };
      } else {
        console.log(action.payload);
        const filter = state.todo.filter((e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          all: filter,
        };
      }
    // case CLEAR:
    //   console.log(action.payload)
    //   if (action.payload === "series") {
    //     return {
    //       ...state,
    //       allSeries: state.backupSeries.slice(),
    //     };
    //   } else if (action.payload === "peliculas") {
    //     return {
    //       ...state,
    //       allMovies: state.backupMovies.slice(),
    //     };
    //   }

    case ADD_TO_CART:
      const item = state.todo.find((e) => e.id === action.payload);
      let cartStorage = localStorage.getItem("cart");
      console.log(typeof cartStorage);

      if (cartStorage === "undefined") {
        b();
        localStorage.setItem("cart", JSON.stringify([item]));
      } else {
        let data = JSON.parse(cartStorage);

        data.find((dato) => dato.id === item.id) ? a() : b();
        if (!data.find((dato) => dato.id === item.id)) {
          data.push(item);
          localStorage.setItem("cart", JSON.stringify(data));
        }
      }
      let datoCart = JSON.parse(localStorage.getItem("cart"));

      return {
        ...state,
        cart: datoCart,
      };
    case REMOVE_TO_CART:
      let filter = state.cart.filter((e) => e.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(filter));
      return {
        ...state,
        cart: filter,
      };

    case GET_LENGUAJE:
      return {
        ...state,
        lenguaje: action.payload,
      };
    case ENGLISH:
      const iso1 = state.isos.map((t) => t.iso_639_1);
      const iso2 = state.isos.map((r) => r.iso_3166_1);
      const isosconcat = iso1.concat(iso2);

      if (action.payload === "en") {
        let english = `${isosconcat[6]}/${isosconcat[38]}`;
        console.log(english);
        return {
          ...state,
          idioma: english,
        };
      } else if (action.payload === "fr") {
        let frances = `${isosconcat[10]}/${isosconcat[42]}`;
        return {
          ...state,
          idioma: frances,
        };
      } else if (action.payload === "pt") {
        let portugues = `${isosconcat[19]}/${isosconcat[51]}`;
        return {
          ...state,
          idioma: portugues,
        };
      } else if (action.payload === "ch") {
        let chino = `${isosconcat[30]}/${isosconcat[62]}`;
        return {
          ...state,
          idioma: chino,
        };
      } else
        return {
          ...state,
          idioma: state.idiomaDefault,
        };

    case GET_ISOS:
      return {
        ...state,
        isos: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootRouter;
