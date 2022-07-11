function EnableDisable(postContent) {
  //Reference the Button.
  var btnSubmit = document.getElementById("post-button");

  //Verify the TextBox value.
  if (postContent.value.trim() != "") {
    //Enable the Button when TextBox has value.
    btnSubmit.disabled = false;
  } else {
    //Disable the Button when TextBox is empty.
    btnSubmit.disabled = true;
  }
}
