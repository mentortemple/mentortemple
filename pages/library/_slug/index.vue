<template>
    <div class="gradient">
      <div class="container">
        <div class="row" v-if="course">
          <div class="col-lg-8 col-md-8 col-xs-12 offset-lg-2 offset-md-2 col-xs-12">
            <h1 class="mb-5 mt-3 text-center primary">{{ course.title }}</h1>

            <div class="mb-5 text-center">
              <button v-if="!userIsEnrolled" @click="enrollIntoCourse()" class="btn btn-secondary">Enroll into course</button>
            </div>

            <div class="course-description">
              <div v-html="$md.render(course.description)"></div>
            </div>

            <div :key="section.id" v-for="section in course.sections" class="card mt-5">
              <h3 class="mb-3 font-weight-bold module-title">
                {{ section.title }}
              </h3>

              <p>
                {{ section.description }}
              </p>

              <nuxt-link :key="lesson.id" v-for="(lesson, index) in getSectionLessons(section)" :to="getLessonLink(lesson.slug)">
                <div class="module-item">
                  {{ index + 1 }}. {{ lesson.title }}
                  <i v-if="$store.state.isAuthenticated" v-bind:class="{ checked: hasCompletedLesson(lesson) }" class="far float-right fa-check-circle"></i>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { GET_COURSE } from "@/store/courses";
import { CREATE_ENROLLMENT } from "@/store/enrollments";

export default {
  mounted() {
    this.$store.dispatch(`courses/${GET_COURSE}`, {
      slug: this.$route.params.slug
    });
  },
  data() {
    return {
      isEnrolled: false
    };
  },
  computed: {
    course() {
      return this.$store.getters[`courses/${GET_COURSE}`](
        this.$route.params.slug
      );
    },
    userIsEnrolled() {
      if (!this.$store.state.isAuthenticated) {
        return false;
      }

      const user = this.$store.state.authUserData.user;

      const userEnrollment = this.course.enrollments.find(enrollment => {
        if (enrollment.user.id) {
          return enrollment.user.id === user._id;
        } else {
          return enrollment.user === user._id;
        }
      });

      if (userEnrollment) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getLessonLink(slug) {
      return `/library/${this.$route.params.slug}/${slug}`;
    },
    getSectionLessons(section) {
      return this.course.lessons.filter(
        lesson => lesson.section === section.id
      );
    },
    enrollIntoCourse() {
      console.log(this.course);
      if (this.$store.state.isAuthenticated) {
        this.$store
          .dispatch(`enrollments/${CREATE_ENROLLMENT}`, this.course)
          .then(() => {
            this.$noty.success(
              "Successfully enrolled into course. Please watchout for our email."
            );
          });
      } else {
        this.$router.push("/auth/signin");
      }
    },
    hasCompletedLesson(lesson) {
      if (!this.$store.state.isAuthenticated) {
        return false;
      }
      const completedLesson = this.course.completedlesson.find(
        completedLessonInStore => {
          if (completedLessonInStore.lesson.id) {
            return (
              completedLessonInStore.lesson.id === lesson.id &&
              completedLessonInStore.user.id ===
                this.$store.state.authUserData.user._id
            );
          } else {
            return (
              completedLessonInStore.lesson === lesson.id &&
              completedLessonInStore.user ===
                this.$store.state.authUserData.user._id
            );
          }
        }
      );

      if (completedLesson) {
        return true;
      }

      return false;
    }
  }
};
</script>
