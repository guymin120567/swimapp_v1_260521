export function setState(
  newState
){

  state = {

    ...state,

    data:{
      ...state.data,
      ...newState.data
    },

    selection:{
      ...state.selection,
      ...newState.selection
    },

    ui:{
      ...state.ui,
      ...newState.ui
    }
  };
}
