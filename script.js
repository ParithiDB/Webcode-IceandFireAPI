
let currentPage = 1;
const cardsPerPage = 2;

async function fetchData() {
  
    try {
    
    let response = await fetch("https://anapioficeandfire.com/api/books");
    const result = await response.json();
    createPagination(result);
    showCards(result, currentPage);
    }
   catch (error) {
    console.log(error);
  }
}


function createPagination(data) {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const pageButtons = document.getElementById("pageButtons");

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showCards(data, currentPage);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showCards(data, currentPage);
    }
  });

  pageButtons.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", function () {
      currentPage = i;
      showCards(data, currentPage);
    });
    pageButtons.appendChild(pageButton);
  }

  updatePaginationButtons();
}

function showCards(data, page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const booksListingContainer = document.getElementById("book");
  booksListingContainer.innerHTML = "";

  if (data.length > 0) {
    const cardsArray = data.slice(startIndex, endIndex).map((d) => {
      const cardNode = document.createElement("div");
      cardNode.setAttribute(
        "class",
        "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
      );
      cardNode.innerHTML = `
        <div class="container">
          <div class="card-container">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <div class="imageContainer">
                    <img src="https://media.istockphoto.com/id/535570181/photo/blank-red-book.jpg?s=170667a&w=0&k=20&c=BWlIHDYQD93O7L4qd0pphxutyHAiliEFdvaoLk8Pjqw=" class="img-fluid rounded-start" alt="book">
                    <div class="caption center">${d.name}</div>
                  </div>
                  <p class="isbn_pages"><b>ISBN : </b>${d.isbn}</p>
                  <p class="isbn_pages"><b>No. of Pages : </b>${d.numberOfPages}</p>
                  <p class="isbn_pages"><b>Publisher :</b> ${d.publisher}</p>
                  <p class="isbn_pages"><b>Released Date : </b>${d.released}</p>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h4 class="card-title">${d.name}</h4>
                    <p class="card-text">
                      <p class="text-h"><b class="text-h">Author : </b>${d.authors}</p>
                      
                        
                    </p>
                    <p><b>Country : </b>${d.country}</p>
                    <p><b>Media Type : </b>${d.mediaType}</p>
                    
                    <a class="btn btn-outline-info" href="${d.characters[5]}" target="_blank" role="button">Click to view characters</a>
                    
                    <br>
                    <div class="buy-btn">
                    <button type="button" class="btn btn-info">Buy now</button>
                    <button type="button" class="btn btn-outline-success">Download E-book</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      return cardNode;
    });
    booksListingContainer.append(...cardsArray);
  }

  updatePaginationButtons();
}

function updatePaginationButtons() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const pageButtons = Array.from(
    document.getElementById("pageButtons").children
  );

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === pageButtons.length;

  pageButtons.forEach((button, index) => {
    button.classList.toggle("active", index + 1 === currentPage);
  });
}

fetchData();

