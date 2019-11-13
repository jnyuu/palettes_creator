import * as types from './types';

const setOutfits = (outfits) => ({
  type: types.SET_OUTFITS,
  outfits,
});
const addOutfit = (newOutfit) => ({
  type: types.ADD_OUTFIT,
  newOutfit,
});
const editOutfit = () => ({
  type: types.EDIT_OUTFIT,
});
const removeOutfit = (index) => ({
  type: types.REMOVE_OUTFIT,
  index,
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

export default {
  addCloth,
  addColor,
  setCloth,
  deleteCloth,
  setColor,
  deleteColor,
  setOutfits,
  addOutfit,
  editOutfit,
  removeOutfit,
};
