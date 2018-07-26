<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="callback-message">
          <h2 class="text-center">
            AUTHENTICATING ...
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_AUTH_USER } from "@/store";

export default {
  mounted() {
    const { code } = this.$route.query;

    if (code) {
      this.$store
        .dispatch(SET_AUTH_USER, code)
        .then(data => {
          const intended = localStorage.getItem("intended");

          if (intended) {
            this.$router.push(intended);
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.$router.push(
            localStorage.getItem("AUTH_WORKFLOW") || "/auth/signin"
          );
        });
    } else {
      // TODO: redirect user to dashboard right here.
      // TODO: Flash Error Message to user.
      this.$router.push(
        localStorage.getItem("AUTH_WORKFLOW") || "/auth/signin"
      );
    }
  }
};
</script>

<style>
.callback-message {
  padding: 16rem 0rem;
}
</style>
