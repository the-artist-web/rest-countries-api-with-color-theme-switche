/**
 * display html
 */
const pushHomeDetail = document.querySelector("[data-push-home-detail]");

pushHomeDetail.innerHTML = `
<div class="img-skeleton"></div>

<div class="home-detail-content">
    <h1 class="name-skeleton"></h1>

    <div class="content-list">
        <div class="content-item">
            <p class="text-skeleton text-1"></p>
            <p class="text-skeleton text-2"></p>
            <p class="text-skeleton text-3"></p>
            <p class="text-skeleton text-4"></p>
            <p class="text-skeleton text-5"></p>
        </div>

        <div class="content-item">
            <p class="text-skeleton text-6"></p>
            <p class="text-skeleton text-7"></p>
            <p class="text-skeleton text-8"></p>
        </div>
    </div>
    <div class="border-countries">
        <p class="border-text-skeleton"></p>
        <div class="countries-list">
            <div class="btn-border-skeleton"></div>
            <div class="btn-border-skeleton"></div>
            <div class="btn-border-skeleton"></div>
            <div class="btn-border-skeleton"></div>
            <div class="btn-border-skeleton"></div>
        </div>
    </div>
</div>
`;

let i = 0;

fetch("./assets/json/data.json")
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    pushHomeDetail.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search') ? decodeURIComponent(urlParams.get('search')).toLowerCase() : '';

    const filteredSurahs = data.filter(item => item.name.toLowerCase().includes(query));

    filteredSurahs.forEach(item => {
        const currencyDetails = item.currencies.map(currency => `${currency.code}, ${currency.name}, ${currency.symbol}`).join('');

        const languagesDetails = item.languages.map(language => `${language.iso639_1}, ${language.iso639_2}, ${language.name}, ${language.nativeName}`).join('');
        
        const translationsDetails = Object.entries(item.translations).map(([key, value]) => `<a href="?search=${value}" class="btn-border">${value}</a>`).join('');

        pushHomeDetail.innerHTML = `
        <figure>
            <img src="${item.flags.svg}" alt="${item.name}" class="img-cover">
        </figure>

        <div class="home-detail-content">
            <h1 class="name">${item.name}</h1>
            <div class="content-list">
                <div class="content-item">
                    <p class="text"><b>Native Name:</b> <span class="span">${item.nativeName}</span></p>
                    <p class="text"><b>Population:</b> <span class="span">${item.population}</span></p>
                    <p class="text"><b>Region:</b> <span class="span">${item.region}</span></p>
                    <p class="text"><b>Sub Region:</b> <span class="span">${item.subregion}</span></p>
                    <p class="text"><b>Capital:</b> <span class="span">${item.capital}</span></p>
                </div>

                <div class="content-item">
                    <p class="text"><b>Top Level Domain:</b> <span class="span">${item.topLevelDomain}</span></p>
                    <p class="text"><b>Currencies:</b> <span class="span">${currencyDetails}</span></p>
                    <p class="text"><b>Languages:</b> <span class="span">${languagesDetails}</span></p>
                </div>
            </div> 
            <div class="border-countries">
                <p class="border-text">Border Countries:</p>

                <div class="countries-list">${translationsDetails}</div>
            </div>
        </div>
        `;
    });
});