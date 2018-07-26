<template>
    <div class="gradient">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-md-10 col-xs-12 offset-lg-1 offset-md-1">
            <h1 class="mb-5 mt-3 text-center primary">My Dashboard</h1>

            <div class="dashboard-content">
              <ul class="nav nav-tabs" id="dashboardTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="mentorship-tab" data-toggle="tab" href="#mentorship" role="tab" aria-controls="mentorship" aria-selected="false">Mentorship</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Profile</a>
                </li>
              </ul>
              <div class="tab-content" id="dashboardTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <h4 class="text-center primary mt-5">Enrolled courses</h4>

                  <div class="row">
                    <div class="col-md-10 offset-md-1">
                      <EnrolledCourseCard :key="enrollment.id" v-for="enrollment in courses.enrolledCourses" :enrollment="enrollment"/>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="mentorship" role="tabpanel" aria-labelledby="mentorship-tab">
                  <h4 class="text-center primary mt-5">Pending submissions from all mentees</h4>
                  <div class="row">
                    <div class="col-md-10 offset-md-1">
                      <DashboardMentorshipCard :enrollment="enrollment" v-for="enrollment in courses.mentorshipCourses" :key="enrollment.id"/>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import EnrolledCourseCard from "@/components/EnrolledCourseCard";
import { GET_ENROLLED_AND_MENTORED_COURSES } from "@/store/courses";
import DashboardMentorshipCard from "@/components/DashboardMentorshipCard";

export default {
  middleware: "authenticated",
  mounted() {
    this.$store.dispatch(`courses/${GET_ENROLLED_AND_MENTORED_COURSES}`);
  },
  computed: {
    ...mapState(["courses"])
  },
  components: {
    EnrolledCourseCard,
    DashboardMentorshipCard
  },
  methods: {
    getPendingSubmissions(enrollment) {
      return enrollment.submissions.filter(
        submission => submission.status === "pending"
      );
    }
  }
};
</script>
