/**
 * selected
 */
const selectedBtn = document.querySelector("[data-selected]");
const selectedList = document.querySelector("[data-selected-list]");

selectedBtn.addEventListener("click", () => {
    selectedList.classList.toggle("active");
});

/**
 * push boxs world
 */
const pushBoxsWorld = document.querySelector("[data-push-boxs-world]");

pushBoxsWorld.innerHTML = `
<div class="skeleton">
    <div class="skeleton-img"></div>
    <div class="skeleton-body">
        <div class="skeleton-title"></div>
        <div class="skeleton-list">
            <div class="skeleton-text text-1"></div>
            <div class="skeleton-text text-2"></div>
            <div class="skeleton-text text-3"></div>
        </div>
    </div>
</div>
`.repeat(12);

fetch("./assets/json/data.json")
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    };
    return response.json();
})
.then(data => {
    pushBoxsWorld.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search') ? decodeURIComponent(urlParams.get('search')).toLowerCase() : '';

    const filteredSurahs = data.filter(item => item.region.toLowerCase().includes(query));

    filteredSurahs.forEach(item => {
        pushBoxsWorld.innerHTML += `
        <a href="display.html?search=${item.name}" class="box" data-box>
            <figure>
                <img src="${item.flags.svg}" alt="${item.name}" loading="lazy" class="falg img-cover">
            </figure>

            <div class="box-body">
                <h3 class="title" data-title>${item.name}</h3>

                <div class="text-list">
                    <p class="text-item"><b>Population:</b> <span class="span">${item.population}</span></p>
                    <p class="text-item"><b>Region:</b> <span class="span">${item.region}</span></p>
                    <p class="text-item"><b>Capital:</b> <span class="span">${item.capital}</span></p>
                </div>
            </div>
        </a>
        `;
    });

    const search = document.querySelector("[data-search]");
    const title = document.querySelectorAll("[data-title]");
    const box = document.querySelectorAll("[data-box]");
    
    search.addEventListener("keyup", () => {
        for (let i = 0; i < title.length; i++) {
            if (title[i].innerHTML.toLowerCase().indexOf(search.value.trim().toLowerCase())) {
                box[i].style.display = "none";
            } else {
                box[i].style.display = "";
            };
        };
    });
});