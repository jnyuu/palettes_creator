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
const clearSelectedColors = () => ({
  type: types.CLEAR_SELECTED_COLORS,
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


const addColor = (index) => ({
  type: types.ADD_COLOR,
  index,
});
const setCurrentColor = (value) => ({
  type: types.SET_CURRENT_COLOR,
  value,
});
const setColor = (clothIndex, colorIndex, value) => ({
  type: types.SET_COLOR,
  clothIndex,
  colorIndex,
  value,
});
const deleteColor = (clothIndex, colorIndex) => ({
  type: types.DELETE_COLOR,
  clothIndex,
  colorIndex,
});


const toggleEditing = () => ({
  type: types.TOGGLE_EDITING,
});

const setImage = (image) => ({
  type: types.SET_IMAGE,
  image,
});
const updateImageInfo = (imageInfo) => ({
  type: types.UPDATE_IMAGE_INFO,
  imageInfo,
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
  setCurrentColor,
  clearSelectedColors,
  updateImageInfo,
};
