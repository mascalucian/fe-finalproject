<template>
  <div>
    <header>
      <h1>Create a new Portofolio</h1>
    </header>
    <div id="main-container">
      <form>
        <div class="banner-image">
          <div class="profile-picture">
            <img id="profile-picture-img" />
            <div class="profile-picture-upload">
              <label>Upload your profile picture</label>
              <input type="file" id="profile-pic-input" />
            </div>
          </div>
          <div class="names-title">
            <div class="names">
              <input type="text" id="first-name" placeholder="First Name" />
              <input type="text" id="last-name" placeholder="Last Name" />
            </div>
            <div class="title">
              <input type="text" id="title" placeholder="Your post" />
            </div>
          </div>
          <div class="banner-upload">
            <input type="file" id="banner-input" />
          </div>
        </div>
        <div class="middle-section">
          <div class="about">
            <textarea></textarea>
          </div>
          <div class="pdf">
            <label>Upload your resume</label>
            <input type="file" id="pdf-input" />
          </div>
        </div>
        <div class="projects">
          Add your projects:
          <form id="add-project-form">
            <div class="project-form-field">
              <input
                type="text"
                id="project-title"
                placeholder="Project Title"
              />
            </div>
            <div class="project-form-field">
              <input
                type="text"
                id="project-description"
                placeholder="Project Description"
              />
            </div>
            <label>Upload a picture for your project!</label>
            <div class="project-form-field">
              <input type="file" id="project-image-input" />
            </div>
          </form>
          <div class="projects list">
            <div></div>
          </div>
        </div>
        <div class="socials-contact">
          <div class="socials">
            <form id="add-socials-form">
              <select>
                <option>Facebook</option>
              </select>
              <input type="text" id="socials-URL" placeholder="Socials URL" />
            </form>
            <div></div>
          </div>
          <div class="contact">
            <div class="contact-form-field">
              <input type="text" id="phone-number" placeholder="Phone Number" />
            </div>
            <div class="contact-form-field">
              <input type="email" id="email" readonly />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
