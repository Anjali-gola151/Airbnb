console.log("JS WORKING");

(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})();

function loadCategory(category) {
    console.log("CLICKED:", category);

    fetch(`/listings?category=${category}`, {
        headers: { Accept: "application/json" }
    })
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector(".row");
        container.innerHTML = "";

        data.forEach(listing => {
            container.innerHTML += `
                <a href="/listings/${listing._id}" class="listing-link">
                    <div class="card listing-card">
                        <img src="${listing.image.url}" class="card-img-top" style="height: 20rem;">
                        <div class="card-body">
                            <b>${listing.title}</b><br/>
                            ₹${listing.price}
                        </div>
                    </div>
                </a>
            `;
        });
    });
}

window.loadCategory = loadCategory;