export default ({ store, redirect }) => {
  if (store.state.authUserData) {
    return redirect("/");
  }
};
