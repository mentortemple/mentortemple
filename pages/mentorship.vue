<template>
    <div class="gradient">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-md-10 col-xs-12 offset-lg-1 offset-md-1">
            <h1 class="mb-5 mt-3 text-center primary">Mentorship</h1>

            <div class="course-description text-center">
              This is where you give back to the community. Apply to become a mentor on a specific course.
            </div>
            <MentorshipCourseCard :key="course.id" v-for="course in courses.data" :course="course"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_COURSES } from "@/store/courses";
import MentorshipCourseCard from "@/components/MentorshipCourseCard";

export default {
  components: {
    MentorshipCourseCard
  },
  mounted() {
    this.$store.dispatch(`courses/${GET_COURSES}`);
  },
  computed: {
    ...mapState(["courses"])
  }
};
</script>
