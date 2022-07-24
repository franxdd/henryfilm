import {
  DETAIL,
  GET_ALL_SERIES,
  GET_ALL_MOVIES,
  GET_SERIES_DETAIL,
  GET_MOVIES_DETAIL,
  WILLUNMOUNT,
  WILLUNMOUNT2,
  GET_NAME_MOVIES,
  GET_NAME_SERIES,
  GET_TODO,
  FILTER_NAME,
} from "../Actions/Actions.js";
const initialState = {
  allMovies: [],
  allSeries: [],
  movieDetail: {},
  seriesDetail: {},
  backupSeries: [],
  backupMovies: [],
  all: [],
  todo: [],
  backupTodo: [],
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
      console.log(state.movieDetail);
      return {
        ...state,
        movieDetail: action.payload,
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
    case GET_TODO:
      console.log(action.payload);
      return {
        ...state,
        todo: action.payload,
        backupTodo: action.payload,
      };
    case FILTER_NAME:
      console.log(action.payload);
      if (action.payload.length === 0) {
        return {
          todo: state.backupTodo,
        };
      } else {
        const filter = state.todo.filter((e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          all: filter,
        };
      }

    default:
      return { ...state };
  }
};

export default rootRouter;
