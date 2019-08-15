export default {
  setLogoImg(state, logoImg) {
    state.logoImg = logoImg
    state.isGetLogoImg = true
  },
  setUser(state, { photo, userName }) {
    state.user = {
      photo,
      userName
    }
    state.isGetUser = true
  },
  setAppData(state, appData) {
    state.appData = appData
    state.isGetAppData = true
  }
}
