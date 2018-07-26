<template>
  <div class="gradient">
      <div class="container" v-if="lesson && course">
        <div class="row">
            <div class="col-md-12">
              <h6 class="mb-2 text-center primary lesson-subtitle">{{ course.title }}</h6>
              <p class="lesson-title my-4 text-center">{{ lesson.title }}</p>

              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <div v-html="$md.render(lessonContent)" />
                </div>
              </div>
            </div>
        </div>
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div  v-if="!showSubmissionForm" class="card mt-5 card-lesson">
              <h4 class="mb-1 text-center primary">{{ course.title }}</h4>
              <h5 class="lesson-title my-2 text-center">{{ lesson.title }}</h5>

              <div class="card-body text-center">
                <nuxt-link :to="`/library/${$route.params.slug}`" class="btn btn-secondary">View Course</nuxt-link>
                <button v-if="!lesson.isProject" @click="markAsCompleted" class="btn hero-button mx-2">{{
                    hasCompletedLesson ? 'Completed': 'Mark as completed.'
                  }}</button>
                  <button v-else @click="handleShowSubmissionForm()" :disabled="hasCompletedLesson" class="btn hero-button mx-2">{{ hasCompletedLesson ? 'Completed !': 'Submit project output' }}</button>
                   <a href="/" class="btn btn-secondary">Next Lesson</a>
              </div>
            </div>
            
            <div v-if="showSubmissionForm && !hasCompletedLesson" class="card mt-5 card-submittion">
              <h3 class="text-center my-3 primary">Add new submission for project</h3>
              <form v-on:submit.prevent="addSubmission">
                <input v-model="submission.url" type="url" class="form-control mb-5" placeholder="Url to your submission">
                <textarea v-model="submission.description" placeholder="Brief description about your submission ..." rows="4" class="form-control"></textarea>

                  <div class="text-center mt-5">
                    <button type="button" class="btn btn-secondary mx-2" @click="showSubmissionForm = !showSubmissionForm">Cancel</button>
                    <button class="btn hero-button mx-2">Submit project output</button>
                  </div>
              </form>
            </div>

            <div v-if="lesson.isProject && userSubmissions.length > 0" class="card mt-5 card-submission">
              <h4 class="text-center">Submissions</h4>
              <div class="accordion">
                <div class="card" id="submissions-accordion" :key="submission.id" v-for="(submission, index) in userSubmissions">
                  <div class="card-header" :id="`heading-${submission.id}`">
                    <h5 class="mb-0">
                      <a data-toggle="collapse" :data-target="`#collapse-${submission.id}`" aria-expanded="true" :aria-controls="`#collapse-${submission.id}`">
                        Submission #{{ index + 1 }}
                      </a>
                    </h5>
                  </div>

                  <div :id="`collapse-${submission.id}`" class="collapse" :aria-labelledby="`#heading-${submission.id}`" data-parent="#submissions-accordion">
                    <div class="card-body">
                      <p>{{ submission.description }}</p>
                      <a  target="_blank" :href="submission.url">
                        <button class="btn px-4 btn-sm btn-secondary">
                          <i class="far fa-eye"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { GET_LESSON_CONTENT } from "@/store/lessonContents";
import {
  GET_COURSE,
  GET_LESSON,
  COMPLETE_LESSON,
  CREATE_SUBMISSION
} from "@/store/courses";

export default {
  middleware: ["authenticated"],
  mounted() {
    this.$store
      .dispatch(`courses/${GET_COURSE}`, {
        slug: this.$route.params.slug,
        lesson: this.$route.params.lesson
      })
      .then(() => {
        this.checkIfUserEnrolled();
        this.getLessonContent();
      })
      .catch(error => {
        this.$router.push("/library");
      });
  },
  data() {
    return {
      lessonContent: "",
      isEnrolled: false,
      showSubmissionForm: false,
      submission: {
        url: "",
        description: ""
      }
    };
  },
  computed: {
    lesson() {
      return this.$store.getters[`courses/${GET_LESSON}`]({
        courseSlug: this.$route.params.slug,
        lessonSlug: this.$route.params.lesson
      });
    },
    userSubmissions() {
      const { user } = this.$store.state.authUserData;
      return this.course.submissions.filter(submission => {
        if (submission.user.id) {
          return (
            submission.user.id === user._id &&
            submission.lesson.id === this.lesson.id
          );
        } else {
          return (
            submission.user === user._id && submission.lesson === this.lesson.id
          );
        }
      });
    },
    hasCompletedLesson() {
      const completedLesson = this.course.completedlesson.find(
        completedLessonInStore => {
          if (completedLessonInStore.lesson.id) {
            return (
              completedLessonInStore.lesson.id === this.lesson.id &&
              completedLessonInStore.user.id ===
                this.$store.state.authUserData.user._id
            );
          } else {
            return (
              completedLessonInStore.lesson === this.lesson.id &&
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
    },
    authUser() {
      return this.$store.state.authUserData;
    },
    course() {
      return this.$store.getters[`courses/${GET_COURSE}`](
        this.$route.params.slug
      );
    }
    // lessonContent() {
    //   return this.$store.state.lessonContents[this.lesson.id];
    // }
  },
  methods: {
    secondsToString(seconds) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}:${(seconds -= minutes * 60)}`;
    },
    handleShowSubmissionForm() {
      if (!this.hasCompletedLesson) {
        this.showSubmissionForm = !this.showSubmissionForm;
      }
    },
    getPlayerSource(video) {
      return `https://player.vimeo.com/video/${video}`;
    },
    async getLessonContent() {
      // this.$store.dispatch(`lessonContents/${GET_LESSON_CONTENT}`, this.lesson);
      this.lessonContent = (await this.$axios.get(this.lesson.url)).data;
    },
    addSubmission() {
      this.$store
        .dispatch(`courses/${CREATE_SUBMISSION}`, {
          lesson: this.lesson,
          ...this.submission
        })
        .then(() => {
          this.$noty.success(
            "Output for lesson project submitted successfully."
          );

          this.showSubmissionForm = false;
        });
    },
    checkIfUserEnrolled() {
      const user = this.$store.state.authUserData.user;
      const isEnrolled = this.course.enrollments.find(enrollment => {
        if (enrollment.user.id) {
          return enrollment.user.id === user._id;
        } else {
          return enrollment.user === user._id;
        }
      });

      if (!isEnrolled) {
        this.$noty.info(
          "You need to enroll into course before viewing this lesson."
        );
        return this.$router.push(`/library/${this.$route.params.slug}`);
      }
    },

    markAsCompleted() {
      this.$store
        .dispatch(`courses/${COMPLETE_LESSON}`, this.lesson)
        .then(() => {
          if (this.hasCompletedLesson) {
            this.$noty.success("Successfully marked as completed.");
          } else {
            this.$noty.success("Successfully marked as not completed.");
          }
        });
    }
  }
};
</script>
