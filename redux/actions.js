import * as types from './types';

const setOutfits = (outfits) => ({
  type: types.SET_OUTFITS,
  outfits,
});
const setEditingIndex = (editedOutfitIndex) => ({
  type: types.SET_EDITING_INDEX,
  editedOutfitIndex,
});
const clearCurrentClothes = () => ({
  type: types.CLEAR_CURRENT_CLOTHES,

});


const addCloth = (cloth) => ({
  type: types.ADD_CLOTH,
  cloth,
});
const setCloth = (value, index) => ({
  type: types.SET_CLOTH,
  value,
  index,
});
const deleteCloth = (index) => ({
  type: types.DELETE_CLOTH,
  index,
});


const addColor = (color, index) => ({
  type: types.ADD_COLOR,
  color,
  index,
});
const setColor = (value, index) => ({
  type: types.SET_COLOR,
  value,
  index,
});
const deleteColor = (index) => ({
  type: types.DELETE_COLOR,
  index,
});


const toggleEditing = () => ({
  type: types.TOGGLE_EDITING,
});

const setImage = (image) => ({
  type: types.SET_IMAGE,
  image,
});
export default {
  addCloth,
  addColor,
  setCloth,
  deleteCloth,
  setColor,
  deleteColor,
  setOutfits,
  setEditingIndex,
  toggleEditing,
  setImage,
  clearCurrentClothes,
};
