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

window.loadCategory = async function(category) {
    const res = await fetch(`/listings?category=${category}`, {
        headers: {
            Accept: "application/json"
        }
    });

    const data = await res.json();

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
}