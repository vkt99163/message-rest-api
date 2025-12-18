const deleteForms = document.querySelectorAll('.delete-form');

deleteForms.forEach(form => {
  form.addEventListener('submit', function (e) {
    const ok = confirm('do you really want to delete  this Chat?');
    if (!ok) {
      e.preventDefault();   // No pe form submit/call cancel
    }
  });
});
