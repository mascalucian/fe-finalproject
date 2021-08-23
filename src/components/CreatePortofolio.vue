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

<style scoped lang="scss">
header {
  background-color: $w-9;
  width: 100%;
  padding: 0.8em;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 3px solid rgba(241, 234, 234, 0.699);
  h1 {
    background-color: $o;
    padding: 1em 6em;
    width: fit-content;
    margin: auto;
    color: $w;
    border-radius: 50px;
    border: 3px solid rgba(42, 158, 207, 0.45);
    box-shadow: 8px 8px rgba(22, 22, 22, 0.527);
    text-align: center;
  }
}

#main-container {
  background-color: $w-10;
  color: $w;
  min-height: 100vh;
}

input[type="file"] {
}

::-webkit-file-upload-button {
  background: none;
  color: $s;
  border: 3px solid $s;
  padding: 0.5rem 1.2rem;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    color: $sh;
    border: 3px solid $sh;
  }
  &:active {
    color: $sh;
    border: 3px solid $sh;
  }
}
</style>
