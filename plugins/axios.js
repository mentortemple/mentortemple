export default ({ $axios, store }) => {
  $axios.interceptors.request.use(config => {
    const { authUserData } = store.state;
    console.log(config.url);

    if (authUserData && config.url.indexOf("githubusercontent") === -1) {
      config.headers.common["Authorization"] = `Bearer ${authUserData.jwt}`;
    }

    return config;
  });
};
