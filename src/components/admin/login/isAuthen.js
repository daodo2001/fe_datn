class Authentication {
  isAuthentication() {
    let accessToken = null;
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (
        user.roles.includes("ROLE_ADMIN") ||
        user.roles.includes("ROLE_STAFF")
      ) {
        accessToken = user;
      }
    }

    return accessToken !== null;
  }
  isAuthenticationUser() {
    let accessToken = null;
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      accessToken = user;
    }

    return accessToken !== null;
  }
}

const authentication = new Authentication();
export { authentication };
