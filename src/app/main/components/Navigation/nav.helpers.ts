import firebase from 'firebase'

export const logout = () => {
  firebase.auth().signOut()
  window.location.reload()
}
