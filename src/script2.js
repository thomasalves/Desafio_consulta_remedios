let data = [];
var data1 = [];
const games = [];
var preco_games =0;
var valoresGame =0;
var subtotal = 0;
var frete = 0;
var totalAPagar = 0;
let flag = 0;
var lista2 = [0]


// FUNÇÃO CRIADA PARA RANDERIZAR A PAGINA
function page(){
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }

   {
  data.forEach( index => {

const card = document.createElement('div');
card.className = "card";



const Image = document.createElement('img');
Image.src = index.image;

const h1 = document.createElement('div');
h1.className ="name";
h1.innerHTML = index.name;

const span = document.createElement('span');
span.className = "add";
span.innerHTML = "Adcionar no Carrinho";
span.addEventListener('click',() => AddCarrinho(index.name, index.image, index.price));
//span.addEventListener('click',() => Adicionar())


const h3 = document.createElement('div');
h3.className ="price";
h3.innerHTML = `R$ ${index.price}`;


container.appendChild(card);

card.appendChild(Image)
card.appendChild(h1);

card.appendChild(h3);
card.appendChild(span);

});

}
}

// FILTRO  POR NOME, PREÇO OU POPULARIDADE
function update(){
var select = document.getElementById('filter');
	var value = select.options[select.selectedIndex].value;
  console.log(value);
  if( value == 'mais'){

    data= data.sort(function (a, b) {
      return(a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
    });
    page();
} else if(value == 'nome' ){
  data= data.sort(function (a, b) {
    return(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
  });
  page();


}else if( value == 'preço'){

  data= data.sort(function (a, b) {
    return(a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
  });
  page();
}}



const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

const aside = document.createElement('div');
aside.setAttribute('class', 'aside');

app.appendChild(container);
app.appendChild(aside);

const card2 = document.createElement('div');
  card2.className = "carrinho";

const card3 = document.createElement('div');
  card3.className ="vazio";

const card4 = document.createElement('div');
  card4.className ="compras";

  const titulo = document.createElement('h1');
  titulo.className = "titulo";
  titulo.innerHTML="Carrinho:";

  const itens = document.createElement('h2');
  itens.className = "itens";


  const pagamento= document.createElement('div');
  pagamento.setAttribute('class', 'pagamento');


  const botao= document.createElement('div');
  botao.setAttribute('class', 'botao');


  aside.appendChild(card2);
  aside.appendChild(card4);
  aside.appendChild(card3);
  aside.appendChild(pagamento);
  aside.appendChild(botao);
  card2.appendChild(titulo);


    var request = new XMLHttpRequest();
    request.open('GET', '../data/products.json', true);


  request.onload = function ap (){
    data = JSON.parse(this.responseText);

    if (request.status >= 200 && request.status < 400) {
      data.forEach( index => {


        //console.log(data)
     const card = document.createElement('div');
     card.className = "card";



     const Image = document.createElement('img');
     Image.src = index.image;

     const h1 = document.createElement('div');
     h1.className ="name";
     h1.innerHTML = index.name;

     const span = document.createElement('span');
     span.className = "add";
     span.innerHTML = "Adcionar no Carrinho";
     span.addEventListener('click',() => AddCarrinho(index.name, index.image, index.price));
     //span.addEventListener('click',() => Adicionar())


     const h3 = document.createElement('div');
     h3.className ="price"
     h3.innerHTML = `R$ ${index.price}`;


     container.appendChild(card);

     card.appendChild(Image);
     card.appendChild(h1);

     card.appendChild(h3);
     card.appendChild(span);


    });
    render_carrinho(games);
  }
}

request.send();

//console.log(games.Nome)
//função para adicionar valor no carrinho, primeiro ela pega os valores mandados para o local storage
//apos isso, esse valor são armagenados em um array games
function AddCarrinho(nome, Imagem, valor)
 {
  flag = 0;

  localStorage.setItem("nome" , nome);
  localStorage.setItem("Imagem" , Imagem);
  localStorage.setItem("valor", valor);

  var lista = {

    Nome: localStorage.getItem('nome'),
    Valor: localStorage.getItem('valor'),
    Imagem: localStorage.getItem('Imagem')
  }
  games.push(lista);

   //  console.log(games)
   //console.log(Games)
   localStorage.clear();
   render_carrinho(games);

}


// FUNÇÃO PARA RENDERIZAR O CARRINHO DE COMPRAS

function render_carrinho(games) {

  // PRIMEIRO É PRECISO LIMPAT OS CARS, COM ESSES WHILES, PODEMOS REMOVER TODOS OS FILHOS
  // QUE EXISTEM EM CADA CARD, COM TODOS LIMPOS PODEMOS RENDERIZAR OS NOVOS
  while(card3.firstChild) {
    card3.removeChild(card3.firstChild);
}
while(card4.firstChild) {
  card4.removeChild(card4.firstChild);
}
  if(games != 0){


    games.forEach((index) => {


      const cardCapa= document.createElement('div');
      cardCapa.setAttribute('class', 'cardCapa');

      const capa = document.createElement('img')
      capa.className = "capa";
      capa.src = index.Imagem;

      const cardInfo= document.createElement('div');
      cardInfo.setAttribute('class', 'cardInfo');


      const titulo_game = document.createElement('h1')
      titulo_game.className = "titulo_game";
      titulo_game.innerHTML= index.Nome;

      const  price_game = document.createElement('h3')
      price_game.className = "preco_game";
      price_game.innerHTML =  index.Valor;

      const remove = document.createElement('button')
      remove.className = 'remove';
      remove.innerHTML = 'x';
      remove.addEventListener('click',() => remover(games, index, subtotal ));


      itens.innerHTML=`(${games.length} itens)`;

      card2.appendChild(itens)
      card4.appendChild(cardCapa);
      card4.appendChild(cardInfo);
      cardCapa.appendChild(capa);
      cardInfo.appendChild(titulo_game)
      cardInfo.appendChild(price_game);
      cardInfo.appendChild(remove);

    })


  // AQUI NOS PEGAMOS OS VALORES DO PREÇO ARMAZENADOS, CONVERTEMOS TODOS PARA FLOAT, POIS ELES
  //ANTERIORMENTE VÃO VIR COMO STRING. COM ESSES DADOS NOS OS ADICIONAMOS A UMA LISTA, QUE VAI
  // CONTER TODOS OS VALORES DE PREÇO EXIXTENTE NO CARRINHO.
    var teste = document.getElementsByClassName('preco_game');
    for (var pos = 0; pos < teste.length; pos++){
      valoresGame = parseFloat(teste[pos].innerHTML);

    }
    if(!flag){
    lista2.push(valoresGame);
    flag= 0;
  }
  // NESSE REDUCE PODEMOS PEGAR A LISTA E SOMAR TODOS OS VALORES DELA, TENTO ASSIM O VALOR DO SUBTOTAL
    console.log(lista2)
    const subtotal = lista2.reduce((total, currentElement) => total + currentElement);

   // ESSE IF SERÁ RESPONSAVEL POR TESTAR SE O SUBTOTAL E MAIOR OU NÃO  QUE 250, SE FOR VALOR O FRETE
   // SERÁ IGUAL A 0, SE FOR MENOR SERÁ R$10 POR ITEM.
    if(subtotal < 250){
      frete = games.length * 10;

    }else{
      frete = 0;
    }
    totalAPagar = subtotal + frete;


    while(pagamento.firstChild) {
      pagamento.removeChild(pagamento.firstChild);
    }
    while(botao.firstChild) {
      botao.removeChild(botao.firstChild);
    }

    const pag= document.createElement('div');
    pag.setAttribute('class', 'pag');

    const sub_total = document.createElement('h3')
    sub_total.className = 'subtotal';
    sub_total.innerHTML = "subtotal";

    const fretePago = document.createElement('h3')
    fretePago.className = 'frete';
    fretePago.innerHTML = "Frete:";

    const totalPagar = document.createElement('h3')
    totalPagar.className = 'totalPagar';
    totalPagar.innerHTML = "Total:";


    const pagInfo= document.createElement('div');
    pagInfo.setAttribute('class', 'pagInfo');


    const sub_total2 = document.createElement('h3')
    sub_total2.className = 'subtotal2';
    sub_total2.innerHTML = `R$: ${subtotal.toFixed(2)}`;


    const fretePago2 = document.createElement('h3')
    fretePago2.className = 'frete2';
    fretePago2.innerHTML = `R$: ${frete}`;


    const totalPagar2 = document.createElement('h3');
    totalPagar2.className = 'totalPagar2'
    totalPagar2.innerHTML = `R$: ${totalAPagar.toFixed(2)}`;


    const finalizar =  document.createElement('button')
    finalizar.className = 'finalizar';
    finalizar.innerHTML = "Finalizar compra";
    finalizar.addEventListener('click',() =>{alert("Compra Finalidada com sucesso")});

    pagamento.appendChild(pag);
    pagamento.appendChild(pagInfo);
    pag.appendChild(sub_total);
    pag.appendChild(fretePago);
    pag.appendChild(totalPagar);
    pagInfo.appendChild(sub_total2)
    pagInfo.appendChild(fretePago2);
    pagInfo.appendChild(totalPagar2);
    botao.appendChild(finalizar);



  }else{

// COM O CARRINHO VAZIO É PRECISO REMOVER TODOS OS ITENS QUE ALI ESTAVAM, NO CASO
// ESSE WHILES VÃO REMOVER TODOS OS "FILHOS" DE CADA DIV
  while(card4.firstChild) {
    card4.removeChild(card4.firstChild);
}
  while(card3.firstChild) {
    card3.removeChild(card3.firstChild);
}
  while(pagamento.firstChild) {
  pagamento.removeChild(pagamento.firstChild);
}
while(botao.firstChild) {
  botao.removeChild(botao.firstChild);
  card2.removeChild(itens);
}


  const carro = document.createElement('img');
  carro.id = 'imagem';
  carro.className = "img-carro";
  carro.src = '../assets/cart-icon.svg';



  const sub = document.createElement('h3')
  sub.className = "sub";
  sub.innerHTML = "Até o momento, o seu carrinho está vazio";


  card3.appendChild(carro);

  card3.appendChild(sub);
  }


}



// FUNÇÃO PARA REMOVER ITENS DO CARRINHO E ATUALIZAR SO SUBTOTAL
function remover (array, index, subtotal) {

  games.splice(games.indexOf(index), 1);
  var item = parseFloat(index.Valor);
  lista2.splice(lista2.indexOf(item), 1);
  flag = 1;

  render_carrinho(games);

}
