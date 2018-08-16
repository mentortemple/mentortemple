<template>
  <div class="comment-box-container">
    <div class="comment-box" v-if="showCommentBox">
      <textarea v-if="!preview" v-model="comment" @focus="rows = 10" placeholder="Add to the discussion" :rows="rows" class="p-4 comment-box form-control"></textarea>
      <div class="preview-box p-3" v-if="preview" v-html="$md.render(comment)"></div>
      <button :disabled="invalid" class="btn hero-button my-2 btn-shorter btn-sm float-right" @click="addReply()">Submit</button>
      <button v-if="!invalid" class="btn btn-secondary btn-shorter my-2 mx-2 btn-sm float-right" @click="preview = !preview">{{ preview ? 'Markdown' : 'Preview' }}</button>
    </div>

    <button @click="toogleShowCommentBox" v-if="!showCommentBox" class="btn btn-secondary btn-shorter my-2 mx-2 btn-sm float-right">Add reply</button>
    <button @click="toogleShowCommentBox" v-else class="btn btn-danger btn-shorter my-2 mx-2 btn-sm float-right">Cancel</button>
  </div>
</template>

<script>
import { ADD_DISCUSSION_REPLY } from "@/store/discussions";

export default {
  props: ["id", "nested", "discussion"],
  data() {
    return {
      comment: "",
      rows: 3,
      showCommentBox: false,
      preview: false
    };
  },
  computed: {
    invalid() {
      return this.comment.length < 5;
    }
  },
  methods: {
    addReply() {
      const payload = {
        content: this.comment,
        discussion: this.discussion
      };

      if (this.nested) {
        payload.parent = this.id;
      }
      this.$store
        .dispatch(`discussions/${ADD_DISCUSSION_REPLY}`, payload)
        .then(() => {
          this.comment = "";
          this.rows = 3;
          this.preview = false;
          this.showCommentBox = false;
          this.$noty.success("Reply added successfully.");
        });
    },
    toogleShowCommentBox() {
      if (this.$store.state.authUserData) {
        this.showCommentBox = !this.showCommentBox;
      } else {
        this.$noty.error("Please sign in to add to this discussion");
      }
    }
  }
};
</script>
