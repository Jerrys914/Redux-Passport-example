export default function(state=[], action) {
  switch(action.type){
    case "ADD_TODO":
      return action.payload.data
    case "REMOVE_TODO":
      return action.payload.data
  }
  return state
}