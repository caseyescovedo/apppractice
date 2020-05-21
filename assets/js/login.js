/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit').addEventListener('click', () => {
    const redirectURL = `${window.location.origin}/secret`;
    console.log(redirectURL);
    window.location.replace(redirectURL);
  });
});
