<template>
   <div>
      <div class="header">
        <div class="hero-content text-center">
            <h2 class="hero-header mx-1 mb-5">
              Your professional career starts here
            </h2>
            <p class="px-5 hero-detail">
              Become an expert in your industry. Get mentored by experts.
            </p>
            
            <nuxt-link to='/library'>
              <button class="mt-5 btn btn-primary hero-button">
                Browse Library
              </button>
            </nuxt-link>
        </div>
      </div>

      <div class="how-it-works my-5">
        <h2 class="text-center primary">How It Works</h2>

        <div class="container">
          <div class="row">
            <div class="col-md-4 tile mt-5 text-center">
              <img src="https://res.cloudinary.com/bahdcoder/image/upload/v1532887287/note_ia26lt.svg" alt="">
              <h4 class="text-center primary my-3">Enroll & Learn</h4>
              <p class="text-center">
                Enroll into a course. Go through the best curriculums on the internet to master the skill covered by the course.
              </p>
            </div>
            <div class="col-md-4 tile mt-5 text-center">
              <img src="https://res.cloudinary.com/bahdcoder/image/upload/v1532887287/transfer_oonhtd.svg" alt="">
              <h4 class="text-center primary my-3">Connect & Grow</h4>
              <p class="text-center">
                Get paired with an experienced mentor to guide you through your learning. Connect with others with the same goals as you. 
              </p>
            </div>
            <div class="col-md-4 tile mt-5 text-center">
              <img src="https://res.cloudinary.com/bahdcoder/image/upload/v1532888414/service_sdxo9x.svg" alt="">
              <h4 class="text-center primary my-3">Give back</h4>
              <p class="text-center">
                Apply as a mentor to other users. Share your expertise with the world, and contribute to the lives of others.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="call-to-action py-5">
          <div class="container">
            <div class="row my-5 justify-content-center py-5">
              <nuxt-link to='/auth/signup' class="btn btn-transparent">
                Sign up now
              </nuxt-link>
            </div>
          </div>
        </div>
   </div>
</template>
<script>
export default {};
</script>

<style>
</style>
