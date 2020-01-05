function authHeader() {
  var token = localStorage.getItem("auth");
  return {
    headers: {
      "x-auth": token
    }
  };
}
export default authHeader;
