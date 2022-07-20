import { DETAIL, GET_ALL_SERIES, GET_ALL_MOVIES } from "../Actions/Actions.js";
const initialState = {
  allMovies: [],
  allSeries: [],
  movieDetail: {},
  seriesDetail: {},
  backupSeries: [],
  backupMovies: [],
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

    default:
      return { ...state };
  }
};

export default rootRouter;
