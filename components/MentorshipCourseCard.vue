<template>
  <div class="card course-card my-5" v-if="course">
    <div class="card-heading">
      <div class="card-title">
        <div class="row">
          <div class="col-md-9">
            <p class="course-title">
              <span class="h5 text-muted font-weight-bold">{{ course.title }}</span>
              <span class="text-muted mt-1 course-subtitle d-block">
                {{ course.lessons.length }} lessons
              </span>
            </p>
          </div>
          <div class="col-md-3">
            <nuxt-link :to="`/library/${course.slug}`">
              <button class="btn btn-sm float-right btn-secondary course-link">
                Open Course
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <hr />
      <div class="course-description" v-html="`${$md.render(course.description.substring(0, 100))}...`"></div>
      <div class="course-tags">
        <span :style="{ backgroundColor: tag.color, color: '#fff' }" class="badge mx-1" v-for="tag in course.tags" :key="tag.id">{{ tag.name }}</span>
        <div class="text-center">
          <button v-if="!hasApplied" @click="applyAsMentor()" class="btn btn-sm hero-button course-link">
            Apply as a mentor
          </button>
          <button v-if="hasApplied && application && application.approved === false" disabled class="btn btn-sm hero-button course-link">
            Application pending.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ADD_MENTOR_APPLICATION } from "@/store/courses";

export default {
  props: ["course"],
  mounted() {},
  methods: {
    applyAsMentor() {
      if (!this.$store.state.isAuthenticated) {
        this.$router.push("/auth/signin");
      }
      this.$store
        .dispatch(`courses/${ADD_MENTOR_APPLICATION}`, this.course)
        .then(() => {
          this.$noty.success("Successfully applied to mentor course.");
        });
    }
  },
  computed: {
    ...mapState(["courses"]),
    hasApplied() {
      if (
        !this.course.mentorshipApplications ||
        !this.$store.state.isAuthenticated
      ) {
        return false;
      }
      const mentorshipApplication = this.course.mentorshipApplications.find(
        application => {
          if (application.user.id) {
            return (
              application.user.id === this.$store.state.authUserData.user._id
            );
          } else {
            return application.user === this.$store.state.authUserData.user._id;
          }
        }
      );

      if (mentorshipApplication) {
        return true;
      }

      return false;
    },
    application() {
      return this.course.mentorshipApplications.find(application => {
        if (application.user.id) {
          return (
            application.user.id === this.$store.state.authUserData.user._id
          );
        } else {
          return application.user === this.$store.state.authUserData.user._id;
        }
      });
    }
  }
};
</script>
