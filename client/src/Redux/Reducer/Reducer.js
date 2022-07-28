import {
  DETAIL,
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
  CLEAR,
  POST_PELICULAS,
  ADD_TO_CART,
  REMOVE_TO_CART,
} from "../Actions/Actions.js";

import { filterGenres } from "../../util/filter.js";
import { toast } from "react-toastify";
let cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
if (!cartFromLocalStorage) {
  cartFromLocalStorage = [];
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
  cart: cartFromLocalStorage,
  current: null,
};
const rootRouter = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SERIES:
      return {
        ...state,
        allSeries: action.payload,
        backupSeries: action.payload,
      };

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
      // console.log(state.movieDetail);
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
        seriesDetail: {},
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
          allMovies: state.backupMovies,
        };
      } else {
        return {
          ...state,
          allMovies: arrAuxMovies,
        };
      }

    case FILTRO_GENERO_SERIES:
      const arrAuxSeries = filterGenres(state.allSeries, action.payload);
      if (arrAuxSeries.length === 0) {
        alert("No se encontraron coincidencias");
        return {
          ...state,
          allSeries: state.backupSeries,
        };
      } else {
        return {
          ...state,
          allSeries: arrAuxSeries,
        };
      }

    case FILTRO_GENERO_MOVIES_REVERSA:
      const arrMovie = filterGenres(state.backupMovies, action.payload);
      if (arrMovie.length === 0) {
        return {
          ...state,
          allMovies: state.backupMovies,
        };
      } else {
        return {
          ...state,
          allMovies: arrMovie,
        };
      }

    case FILTRO_GENERO_SERIES_REVERSA:
      const arrSeries = filterGenres(state.backupSeries, action.payload);
      if (arrSeries.length === 0) {
        return {
          ...state,
          allSeries: state.backupSeries,
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
      console.log(typeof action.payload);
      const item = state.todo.find((e) => e.id === action.payload);
      console.log(state.cart, "soy el carro");
      console.log(state.todo, "asd");
      const incart = state.cart.find((i) =>
        i.id === action.payload ? true : false
      );
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
      incart ? a() : b();
      return {
        ...state,
        cart: incart ? state.cart : [...state.cart, { ...item, qty: 1 }],
      };

    case REMOVE_TO_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return { ...state };
  }
};

export default rootRouter;
