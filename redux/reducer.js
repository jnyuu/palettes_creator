import * as types from './types';

const initialState = {
  currentClothes: [],
  outfits: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_OUTFITS:
      return {
        ...state,
        outfits: action.outfits,
        currentClothes: [],
      };

    case types.EDIT_OUTFIT:
      return {

      };


    case types.ADD_CLOTH: {
      return {
        ...state,
        currentClothes: [...state.currentClothes, action.cloth],
      };
    }
    case types.SET_CLOTH: {
      const newClothes = Array.from(state.currentClothes);
      newClothes[action.index].type = action.value;
      return {
        ...state,
        currentClothes: newClothes,
      };
    }
    case types.DELETE_CLOTH: {
      const newClothes = Array.from(state.currentClothes);
      newClothes.splice(action.index, 1);
      return {
        ...state,
        currentClothes: newClothes,
      };
    }


    case types.ADD_COLOR: {
      const newClothes = Array.from(state.currentClothes);
      newClothes[action.index].colors.push(action.color);
      return {
        ...state,
        currentClothes: newClothes,
      }; }
    case types.SET_COLOR:
      return {
        state,
      };
    case types.DELETE_COLOR:
      return {
        state,
      };
    default:
      return state;
  }
};
