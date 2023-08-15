export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  const token = localStorage.getItem("token");

  if (obj && token) {
    return { Authorization: token }
  } else {
    return {}
  }
}
