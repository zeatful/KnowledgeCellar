import { } from '../constants/ActionTypes'

export const toggleHeaderEditMode = editMode => {
  return dispatch => {
    dispatch(headerEditMode(!editMode))
  }
}

const headerEditMode = payload => {
  return {type: HEADER_EDIT_MODE, payload}
}