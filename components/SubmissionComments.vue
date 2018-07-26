<template>
<div v-if="enrollment && submission">
  <div class="modal fade" :id="`viewLessonCommentsModal-${enrollment.id}`" tabindex="-1" role="dialog" aria-labelledby="viewLessonModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewLessonCommentsModalLabel">
              Submittion #{{ submission.index + 1 }}
              <b>
                <i>
                  ({{ submission.lesson.title }})
                </i>
              </b>
            </h5>
            <button @click="$emit('comments-modal-closed')" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4 class="text-center my-5 primary" v-if="submissionComments.comments.length === 0">
              No comments for this submission.
            </h4>
            <div v-else class="comments-container px-5">
              <ul class="list-unstyled">
                <li class="media my-3"  v-for="comment in submissionComments.comments" :key="comment.id">
                  <img class="mr-3 rounded-circle" width="40" height="40" src="https://randomuser.me/api/portraits/men/43.jpg" alt="Generic placeholder image">
                  <div class="media-body">
                    <h6 class="mt-0 mb-1 font-weight-bold">{{ comment.user.username }}</h6>
                    <p>
                      {{ comment.comment }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="comments-form my-3 px-5">
              <textarea v-model="comment" placeholder="Leave a comment ..." rows="3" class="form-control"></textarea>
              <div class="action-buttons" v-if="isMentor">
                <button @click="addComment(true)" :disabled="comment.length < 6" class="btn mt-2 hero-button btn-sm float-right">Approve submission</button>
                <button @click="addComment(false)" :disabled="comment.length < 6" class="btn mt-2 btn-secondary mr-2 btn-sm float-right">Request changes</button>
              </div>
              <button @click="addComment(false)" :disabled="comment.length < 6" class="btn mt-2 hero-button btn-sm float-right" v-else>Add Comment</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="$emit('comments-modal-closed')" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_SUBMISSION_COMMENTS,
  ADD_SUBMISSION_COMMENT
} from "@/store/courses";

export default {
  props: ["enrollment", "submission"],
  data() {
    return {
      submissionComments: {
        comments: []
      },
      comment: ""
    };
  },
  computed: {
    isMentor() {
      return (
        this.$store.state.authUserData.user._id === this.enrollment.mentor._id
      );
    }
  },
  methods: {
    showComments(submission, index) {
      this.submissionComments.submission = submission;
      this.$store
        .dispatch(`courses/${GET_SUBMISSION_COMMENTS}`, submission)
        .then(comments => {
          this.submissionComments.comments = comments;
          this.submissionComments.index = index;

          $(`#viewLessonCommentsModal-${this.enrollment.id}`).modal();
        });
    },
    addComment(approved) {
      this.$store
        .dispatch(`courses/${ADD_SUBMISSION_COMMENT}`, {
          approved,
          comment: this.comment,
          submission: this.submission,
          enrollment: this.enrollment
        })
        .then(comment => {
          if (approved) {
            $(`#viewLessonCommentsModal-${this.enrollment.id}`).modal("hide");
          }
          this.$noty.success("Successfully added comment on submission.");
          this.submissionComments.comments = [
            ...this.submissionComments.comments,
            comment
          ];

          this.comment = "";
        });
    }
  },
  watch: {
    submission() {
      if (this.submission) {
        this.$store
          .dispatch(`courses/${GET_SUBMISSION_COMMENTS}`, this.submission)
          .then(comments => {
            this.submissionComments.comments = comments;

            $(`#viewLessonCommentsModal-${this.enrollment.id}`).modal();
          });
      } else {
        $(`#viewLessonCommentsModal-${this.enrollment.id}`).modal("hide");
      }
    },
    enrollment() {
      if (!this.enrollment) {
        $(`#viewLessonCommentsModal-${this.enrollment.id}`).modal("hide");
      }
    }
  }
};
</script>
