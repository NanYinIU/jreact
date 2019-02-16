export default function login(state = [], action) {
  switch (action.type) {
    case 'LOGIN':
      return state.concat([action.text])
    case 'LOGOUT':
        return state.conca([action.text])
    default:
      return state
  }
}
