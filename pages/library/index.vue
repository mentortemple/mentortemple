<template>
  <div class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 col-xs-12">
          <h1 class="mb-5 mt-3 text-center primary">Library</h1>
          <course-card :key="course.id" v-for="course in courses.data" :course="course"></course-card>
          <div v-if="courses.count > limit" class="text-center">
            <button @click="loadMoreCourses()" class="btn hero-button">Load More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_COURSES } from "@/store/courses";
import SelectTag from "@/components/SelectTag";
import CourseCard from "@/components/CourseCard";

export default {
  components: {
    "course-card": CourseCard,
    "single-tag": SelectTag
  },
  async fetch({ store }) {
    await store.dispatch(`courses/${GET_COURSES}`);
  },
  computed: {
    ...mapState(["courses"])
  },
  data() {
    return {
      limit: 5
    };
  },
  methods: {
    loadMoreCourses() {
      this.limit += 5;
      this.$store.dispatch(`courses/${GET_COURSES}`, this.limit);
    }
  }
};
</script>
