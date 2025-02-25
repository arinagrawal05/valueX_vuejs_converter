<template>
  <!-- Container for the entire Contact Us section -->
  <div class="contactBox" id="contactBox">
       <!-- Section header -->
    <h2 class="contactHead">Contact Us</h2>
    <!-- Container for all contact items arranged in a grid -->
    <div class="contacts">
      <div class="contact">
        <!-- Icon representing phone contact -->
        <img
          src="../assets/image copy 4.png"
          height="35rem"
          width="38rem"
          style="margin-top: 0.8rem"
        />
        <p class="contactText">+91-8293472819</p>
      </div>
      <div class="contact">
        <!-- Icon representing location/contact address -->
        <img
          src="../assets/image copy 6.png"
          height="35rem"
          width="38rem"
          style="margin-top: 0.8rem"
        />
        <!-- Contact text displaying the physical address -->
        <p class="contactText">1234 Elm Street, Apt 56B, Springfield, IL 62701, United States</p>
      </div>
      <div class="contact">
        <!-- Icon representing email contact -->
        <img
          src="../assets/image copy 5.png"
          height="25rem"
          width="45rem"
          style="margin-top: 0.7rem"
        />
        <!-- Contact text displaying the email address -->
        <p class="contactText">example12@mocknet.com</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
  .contact: Styles for each individual contact item container,
  using flexbox to align the icon and text with a gap.
*/
.contact {
  display: flex;
  gap: 1rem;
}
/*
  .contactText: Styles for the text in each contact item,
  defining size, font properties, and an underline decoration.
*/
.contactText {
  width: 22rem;
  height: 2rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 3rem;
  text-decoration: underline;
  text-underline-offset: 0.8rem;
  color: #79747e;
  letter-spacing: 0.15rem;
}
/*
  .contacts: Grid container for arranging contact items.
  Configured to display two columns and two rows with gaps and margins.
*/

.contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
  margin: 3rem 4rem;
}
.contactHead {
  width: 20rem;
  height: 4rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 2.5rem;
  line-height: 2.8rem;
  text-decoration-line: underline;

  color: #79747e;
  margin: 1rem 2rem;
  padding-top: 2rem;
}
/*
  .contactBox: Outer container styling for the Contact section,
  setting the background color and bottom padding.
*/
.contactBox {
  background-color: #111111;
  padding-bottom: 2.5rem;
}
</style>
