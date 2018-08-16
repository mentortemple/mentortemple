export default ({ $axios, store }) => {
  $axios.interceptors.request.use(config => {
    const { authUserData } = store.state;
    console.log(store.state);

    if (authUserData) {
      config.headers.common["Authorization"] = `Bearer ${authUserData.jwt}`;
    }

    return config;
  });
};
