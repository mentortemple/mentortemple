<template>
  <button :class="`text-center auth-button btn mb-2 font-weight-bold btn-${provider} form-control text-capitalize`" @click="redirectToAuthProvider()" type="button">
    {{ loading ? `Authenticating with ${provider} ...` : `${provider}` }}
  </button>
</template>

<script>
export default {
  props: ["provider"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    redirectToAuthProvider() {
      if (this.provider === "facebook") {
        this.$noty.warning(
          "Facebook authentication is currently under review. Please try another provider."
        );

        return;
      }
      this.loading = true;
      localStorage.setItem("AUTH_WORKFLOW", this.$route.path);
      window.location.href = `${process.env.apiUrl}/connect/${this.provider}`;
    }
  }
};
</script>
