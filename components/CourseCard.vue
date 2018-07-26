<template>
  <div class="card course-card my-5" v-if="course">
    <div class="card-heading">
      <div class="card-title">
        <div class="row">
          <div class="col-md-8">
            <p class="course-title">
              <span class="h5 text-muted font-weight-bold">{{ course.title }}</span>
              <span class="text-muted mt-1 course-subtitle d-block">
                {{ course.lessons.length }} lessons
              </span>
            </p>
          </div>
          <div class="col-md-4">
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
        <span :style="{ backgroundColor: tag.color, color: '#fff' }" class="badge mx-1 p-1" v-for="tag in course.tags" :key="tag.id">{{ tag.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["course"],
  mounted() {},
  methods: {
    calculateTotalTime(course) {
      let total = 0;
      course.sections.forEach(section => {
        section.lessons.forEach(lesson => {
          total += lesson.duration;
        });
      });

      const hours = Math.floor(total / 3600);
      const minutes = Math.floor((total - hours * 3600) / 60);

      return `${hours} hrs ${minutes}mins`;
    }
  }
};
</script>
