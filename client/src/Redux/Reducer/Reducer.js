import { DETAIL, GET_ALL_SERIES } from "../Actions/Actions.js";
const initialState = {
  allMovies: [],
  allSeries: [],
  movieDetail: {},
  seriesDetail: {},
  backupSeries: [],
};
const rootRouter = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SERIES:
      return {
        ...state,
        allseries: action.payload,
        backupSeries: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootRouter;
