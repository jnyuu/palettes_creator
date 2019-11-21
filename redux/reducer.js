import * as types from './types';

const initialState = {
  selectingColor: [],
  currentClothes: [],
  outfits: [],
  editingIndex: null,
  currImage: null,
  imageInfo: { },
  currColor: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_OUTFITS: {
      return {
        ...state,
        outfits: action.outfits,
        currentClothes: [],
        currImage: null,
      }; }

    case types.SET_EDITING_INDEX: {
      return {
        ...state,
        currentClothes: state.outfits.slice(0)[action.editedOutfitIndex].clothes.slice(0),
        editingIndex: action.editedOutfitIndex,
        currImage: state.outfits[action.editedOutfitIndex].image,
      };
    }
    case types.CLEAR_CURRENT_CLOTHES:
      return {
        ...state,
        currentClothes: [],
        currImage: null,
        currColor: null,
        selectingColor: [],
        imageInfo: {},
      };
    case types.CLEAR_SELECTED_COLORS:
      return {
        ...state,
        currColor: null,
        selectingColor: [],
      };

    case types.ADD_CLOTH: {
      return {
        ...state,
        currentClothes: [...state.currentClothes, action.cloth],
      };
    }
    case types.SET_CLOTH: {
      const newClothes = state.currentClothes.slice(0);
      newClothes[action.index].type = action.value;
      return {
        ...state,
        currentClothes: newClothes,
      };
    }
    case types.DELETE_CLOTH: {
      const newClothes = state.currentClothes.slice(0);
      newClothes.splice(action.index, 1);
      return {
        ...state,
        currentClothes: newClothes,
      };
    }


    case types.ADD_COLOR: {
      const newClothes = state.currentClothes.slice(0);
      newClothes[action.index] = { ...newClothes[action.index] };
      newClothes[action.index].colors = [
        ...state.currentClothes[action.index].colors,
        null,
      ];
      return {
        ...state,
        currentClothes: newClothes,
        currColor: 'rgb(0, 0, 0)',
        selectingColor: [action.index, newClothes[action.index].colors.length - 1],
      };
    }
    case types.SET_COLOR: {
      const newClothes = state.currentClothes.slice(0);
      newClothes[action.clothIndex] = { ...newClothes[action.clothIndex] };
      newClothes[action.clothIndex].colors[action.colorIndex] = action.value;
      return {
        ...state,
        currentClothes: newClothes,
        currColor: null,
      };
    }
    case types.SET_CURRENT_COLOR: {
      return {
        ...state,
        currColor: action.value,
      };
    }
    case types.DELETE_COLOR: {
      const newClothes = state.currentClothes.slice(0);
      newClothes[action.clothIndex] = { ...newClothes[action.clothIndex] };
      newClothes[action.clothIndex].colors = [...newClothes[action.clothIndex].colors];
      newClothes[action.clothIndex].colors.splice(action.colorIndex, 1);
      return {
        ...state,
        currentClothes: newClothes,
      };
    }


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
    case types.UPDATE_IMAGE_INFO: {
      return {
        ...state,
        imageInfo: action.imageInfo,
      };
    }

    default:
      return state;
  }
};
