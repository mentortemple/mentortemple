<template>
  <div>
    <div class="card course-card my-5" v-if="enrollment">
      <div class="card-heading">
        <div class="card-title">
          <div class="row">
            <div class="col-md-8">
              <p class="course-title">
                <span class="h5 text-muted font-weight-bold">
                  <nuxt-link :to="`/library/${enrollment.course.slug}`">
                    {{ enrollment.course.title }}
                  </nuxt-link>
                </span>
              </p>
            </div>
            <div class="col-md-4">
              <span class="h4 text-muted font-weight-bold float-right">{{ getPercentageCompleted() }}%</span>
            </div>
          </div>
        </div>
        <hr />

        <div class="accordion">
          <div class="card" id="submissions-accordion-dashboard" :key="submission.id" v-for="(submission, index) in enrollment.submissions">
            <div class="card-header" :id="`heading-${submission.id}`">
              <h5 class="mb-0">
                <a data-toggle="collapse" :data-target="`#collapse-${submission.id}`" aria-expanded="true" :aria-controls="`#collapse-${submission.id}`">
                  Submission #{{ index + 1 }}
                  <nuxt-link :to='`/library/${enrollment.course.slug}/${submission.lesson.slug}`'>
                    <b><i>({{ submission.lesson.title }})</i></b>
                  </nuxt-link>
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
                <button @click="toggleSubmissionComments(submission, index)" class="btn ml-2 btn-secondary">
                    View comments
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

    <SubmissionComments :submission="currentSubmissionComments" @comments-modal-closed="removeSubmissionComments()" :enrollment="enrollment" />
  </div>
</template>

<script>
import SubmissionComments from "@/components/SubmissionComments";
import {
  GET_SUBMISSION_COMMENTS,
  ADD_SUBMISSION_COMMENT
} from "@/store/courses";

export default {
  props: ["enrollment"],
  components: {
    SubmissionComments
  },
  data() {
    return {
      submissionComments: {
        comments: []
      },
      comment: "",
      currentSubmissionComments: null
    };
  },
  methods: {
    userCompletedLessons() {
      return this.enrollment.course.completedlesson.filter(
        completedLesson =>
          completedLesson.user === this.$store.state.authUserData.user._id
      );
    },
    getPercentageCompleted() {
      if (!this.enrollment) {
        return 0;
      }

      const percentage =
        this.userCompletedLessons().length /
        this.enrollment.course.lessons.length;

      return (percentage * 100).toFixed();
    },
    toggleSubmissionComments(submission, index) {
      this.currentSubmissionComments = {
        ...submission,
        index
      };
    },
    removeSubmissionComments() {
      this.currentSubmissionComments = null;
    }
  }
};
</script>
