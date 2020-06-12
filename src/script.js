let currentPage = 1;
// Url da API
const API_URL = "./data/products.json";

const ITEMS_PAGE = 6;


// fadeIn



// função responsavel por fazer o filtro através de palavras
const filterData = (input, places) => {
    console.log(places.name)
    return places.filter(places => places.name.toLowerCase().includes(input.value.toLowerCase()))
}

// função responsavel pela paginação, itens por pagina
const paginateData = (data) => {
    return data.reduce((total, current, index) =>{
        const ArrayIndex = Math.ceil((index + 1) / ITEMS_PAGE) -1;
        total[ArrayIndex] ? total[ArrayIndex].push(current) : total.push([current]);

        return total;
    }, [])
}

// função fetch, função assincrona, para consumir os dados da api
const fetchAPI = async (url) => {
    let response = await fetch(url)
    const TextResponse = await response.text()
    console.log(TextResponse)

    return JSON.parse(TextResponse)
}

// responasavel por fazer qualquer alteração na pagina
const changePage = (pageToRender) => {
    currentPage = pageToRender
    renderPage()
}

// menu de paginação, responsavel por passar a pagina e implementar os botões e suas devidas funções
const renderMenu = (paginatedData) => {

    const paginationContainer = document.querySelector('.pagination')
    // apaga o que tiver na pagina, para poder carregar a proxima
    while(paginationContainer.firstChild){
        paginationContainer.removeChild(paginationContainer.firstChild)
    }
    // botão anterior
    const previous = document.createElement('button')
    previous.className = 'change'
    previous.innerHTML = '<'
    previous.addEventListener('click', () => currentPage <= 1 ? () => { } : changePage
    (currentPage - 1))

    paginationContainer.appendChild(previous)

    paginatedData.forEach((_, index) => {

        const Button = document.createElement('button')
        Button.innerHTML = index + 1
        Button.addEventListener('click', () => changePage(index +1))

        if(currentPage == index + 1){
            Button.className = 'active'
        }

        paginationContainer.appendChild(Button)
    });
    // botão próximo
    const next = document.createElement('button')
    next.className = 'change'
    next.innerHTML = '>'
    next.addEventListener('click', () => currentPage >= paginatedData.length
    ? () => {} : changePage(currentPage + 1),
    );

    paginationContainer.appendChild(next)
};

// renderização da pagina
const renderPage = async () => {
    const apiData = await fetchAPI(API_URL)


    const search = document.querySelector('#filter')
    let filterApi = filterData(search, apiData)
    console.log(filterApi)

    const searchButton = document.querySelector('#search-button')
    searchButton.addEventListener('click', () => {
        filterApi = filterData(search, apiData)
        renderPage()
    })

    //console.log(apiData)


const paginatedData = paginateData(filterApi)
//console.log(paginatedData)

renderMenu(paginatedData);

cardContainer = document.querySelector(".card-container")

while(cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild)
}

paginatedData[currentPage - 1].forEach(aps => {



    cardInfo = document.createElement("div");
    cardInfo.className = "card-info"

    card = document.createElement("div");
    card.className = "card"

    cardImg = document.createElement("img");
    cardImg.className = "img"
    cardImg.src = aps.image

    Tipo = document.createElement("div");
    Tipo.className = "score";
    Tipo.innerHTML = aps.score;


    Preco = document.createElement("div");
    Preco.className = "preco";
    Preco.innerHTML = `R$ ${aps.price.toFixed(2)}/noite`


    Name = document.createElement("div");
    Name.className = "name";
    Name.innerHTML = aps.name;

    cardContainer.appendChild(card);
    card.appendChild(cardImg);
    card.appendChild(cardInfo);
    cardInfo.appendChild(Name)
    cardInfo.appendChild(Tipo)
    cardInfo.appendChild(Preco)




})

}

renderPage()
// paginatedData.forEach((_, index) =>{

// })

// paginatedData[currentPAge - 1].forEach(property => {

//     console.log(property)
// })