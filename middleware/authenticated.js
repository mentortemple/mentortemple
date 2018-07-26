export default ({ store, redirect, route, isClient }) => {
  if (!store.state.authUserData) {
    if (isClient) {
      localStorage.setItem("intended", route.path);
    }
    return redirect("/auth/signin");
  }
};
