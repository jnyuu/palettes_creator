import * as types from './types';

const initialState = {
  clothes: [

  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CLOTH:
      return {
        ...state,
        clothes: [...state.clothes, action.cloth],
      };
    case types.SET_CLOTH: {
      const newClothes = Array.from(state.clothes);
      newClothes[action.index].type = action.value;
      return {
        ...state,
        clothes: newClothes,
      };
    }
    case types.DELETE_CLOTH:
      return {
        state,
      };


    case types.ADD_COLOR: {
      const newClothes = Array.from(state.clothes);
      newClothes[action.index].colors.push(action.value);
      return {
        ...state,
        clothes: newClothes,
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
