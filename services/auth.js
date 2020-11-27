export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('gatsbyUser') ? JSON.parse(window.localStorage.getItem('gatsbyUser')) : {}

export const setUser = (user) => isBrowser() && window.localStorage.setItem('gatsbyUser', JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

// export const logout = (firebase, callback) => {
//   setUser({})
//   return new Promise((resolve) => {
//     firebase
//       .auth()
//       .signOut()
//       .then(function () {
//         setUser({})
//         if (callback) callback()
//         resolve()
//       })
//   })
// }
