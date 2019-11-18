import * as types from './types';

const initialState = {
  currentClothes: [],
  outfits: [],
  editingIndex: null,
  currImage: null,
  currColor: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_OUTFITS:
      return {
        ...state,
        outfits: action.outfits,
        currentClothes: [],
        currImage: null,
      };
    case types.SET_EDITING_INDEX: {
      return {
        ...state,
        currentClothes: state.outfits[action.editedOutfitIndex].clothes,
        editingIndex: action.editedOutfitIndex,
        currImage: state.outfits[action.editedOutfitIndex].image,
      };
    }


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


    case types.TOGGLE_EDITING: {
      let editing;
      if (state.editingIndex !== null) {
        editing = null;
      } else {
        editing = state.editingIndex;
      }
      return {
        ...state,
        editingIndex: editing,
      }; }

    case types.SET_IMAGE: {
      return {
        ...state,
        currImage: action.image,
      };
    }

    default:
      return state;
  }
};
