<template>
    <div>
      <div class="card course-card my-5" v-if="enrollment && getPendingSubmissions(enrollment).length > 0">
        <div class="card-heading">
          <div class="card-title">
            <div class="row">
              <div class="col-md-8">
                <p class="course-title">
                  <span class="h5 text-muted font-weight-bold">{{ enrollment.course.title }} <i>({{ enrollment.user.username }})</i></span>
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div class="accordion">
            <div class="card" id="submissions-accordion" :key="submission.id" v-for="(submission, index) in getPendingSubmissions(enrollment)">
              <div class="card-header" :id="`heading-${submission.id}`">
                <h5 class="mb-0">
                  <a data-toggle="collapse" :data-target="`#collapse-${submission.id}`" aria-expanded="true" :aria-controls="`#collapse-${submission.id}`">
                    Submission #{{ index + 1 }}: <i><b>({{ submission.lesson.title }})</b></i>
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
                  <button @click="viewLesson(submission)" class="btn mx-2 px-4 btn-sm btn-secondary">
                      View lesson
                  </button>
                  <button @click="toggleSubmissionComments(submission, index)" class="btn btn-sm btn-secondary float-right">
                      View Comments
                  </button>
                </div>
              </div>
            </div>
          </div>



          <div class="feedback-form" v-if="showFeedbackForm">
            <textarea v-model="comment" name="" id="" rows="4" class="form-control" :placeholder="`Give Feedback for Submission #${feedbackFor.index + 1} by (${enrollment.user.username})`"></textarea>
            <button :disabled="comment.length < 5" @click="addSubmissionComment(true)" class="btn btn-sm hero-button my-3 float-right">
                Approve submission
            </button>
            <button :disabled="comment.length < 5" @click="addSubmissionComment(false)" class="btn btn-sm mr-3 btn-secondary my-3 float-right">
                Request changes
            </button>
          </div>

          <div class="modal fade" :id="`viewLessonModal-${enrollment.id}`" tabindex="-1" role="dialog" aria-labelledby="viewLessonModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" v-if="currentLesson" id="viewLessonModalLabel">{{ currentLesson.title }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" v-if="currentLesson">
                  <div class="lesson-content px-5" v-html="$md.render(currentLessonData)"></div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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

export default {
  props: ["enrollment"],
  components: {
    SubmissionComments
  },
  data() {
    return {
      currentLesson: null,
      currentLessonData: "",
      showFeedbackForm: false,
      feedbackFor: null,
      comment: "",
      showComments: false,
      currentSubmissionComments: null
    };
  },
  methods: {
    getPendingSubmissions(enrollment) {
      return enrollment.submissions.filter(
        submission => submission.status === "pending"
      );
    },
    toggleSubmissionComments(submission, index) {
      this.currentSubmissionComments = {
        ...submission,
        index
      };
    },
    removeSubmissionComments() {
      this.currentSubmissionComments = null;
    },
    viewLesson({ lesson }) {
      this.currentLesson = lesson;

      this.$axios.get(lesson.url).then(({ data }) => {
        this.currentLessonData = data;
        $(`#viewLessonModal-${this.enrollment.id}`).modal();
      });
    },
    giveFeedback(submission, index) {
      this.showFeedbackForm = true;
      this.feedbackFor = {
        ...submission,
        index
      };
    },
    addSubmissionComment(approved) {
      this.$store
        .dispatch(`courses/${ADD_SUBMISSION_COMMENT_BY_MENTOR}`, {
          approved,
          comment: this.comment,
          submission: this.feedbackFor,
          enrollment: this.enrollment
        })
        .then(() => {
          this.$noty.success("Successfully given feedback on submission.");
          this.feedbackFor = null;
          this.comment = "";
          this.showFeedbackForm = false;
        });
    }
  }
};
</script>
