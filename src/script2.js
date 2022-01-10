let data = [];
let games = [];
var subtotal = 0;
var frete = 0;
var totalAPagar = 0;

async function getDados() {
  await fetch('../data/products.json')
    .then(resposta => resposta.json())
    .then( json => {
      renderCards(json)
     data = json
    })
} 

getDados()

function renderCards(data) {
  limpar(container)
  carrinhoVazio()

  data.forEach( index => {

    const card = document.createElement('div');
    card.className = "card";

    const Image = document.createElement('img');
    Image.src = index.image;

    const nome = document.createElement('div');
    nome.className ="name";
    nome.innerHTML = index.name;

    const addCarrinho = document.createElement('span');
    addCarrinho.className = "add";
    addCarrinho.innerHTML = "Adicionar no Carrinho";
    addCarrinho.addEventListener('click',() => AddCarrinho(index.name, index.image, index.price));

    const preco = document.createElement('div');
    preco.className ="price";
    preco.innerHTML = `R$ ${index.price}`;


    container.appendChild(card);
    card.appendChild(Image)
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(addCarrinho);

  });
}

function filtro(){
var select = document.getElementById('filter');
	var value = select.options[select.selectedIndex].value;
  console.log(value);
  if( value == 'mais'){
    data= data.sort(function (a, b) {
      return(a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
    });
    console.log(data);
    renderCards(data);
} else if(value == 'nome' ){
  data= data.sort(function (a, b) {
    return(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
  });
  renderCards(data);


}else{

  data= data.sort(function (a, b) {
    return(a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
  });
  renderCards(data);
}}

function AddCarrinho(nome, imagem, valor) {
  var lista = {
    
    Nome: nome,
    Valor: valor,
    Imagem: imagem,
  }
  games.push(lista);
  gamesNoCarrinho(games);
  valorGamesNoCarrinho(games)
  
}

function gamesNoCarrinho(games) {
  document.getElementById('carroIcon').style.display = 'none';
  document.getElementById('finalizar').style.display = 'block';

  const itens = document.createElement('div');
  limpar(compras)
  limpar(itens)
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
  remove.addEventListener('click',() => remover(index));
  
  
  itens.innerHTML=`(${games.length} itens)`;
  
  compras.appendChild(cardCapa);
  compras.appendChild(cardInfo);
  cardCapa.appendChild(capa);
  cardInfo.appendChild(titulo_game)
  cardInfo.appendChild(price_game);
  cardInfo.appendChild(remove);
  compras.appendChild(itens)
  
})
  }

function valorGamesNoCarrinho(games) {  
    limpar(pagamento)
    totalAPagar = calculoTotalAPagar(games)
    
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
    
    
    const valorSub_total = document.createElement('h3')
    valorSub_total.className = 'valorSubtotal';
    valorSub_total.innerHTML = `R$: ${subtotal.toFixed(2)}`;
    
    
    const Valorfrete = document.createElement('h3')
    Valorfrete.className = 'Valorfrete';
    Valorfrete.innerHTML = `R$: ${frete}`;
    
    const valorTotalPagar = document.createElement('h3');
    valorTotalPagar.className = 'valorTotalPagar'
    valorTotalPagar.innerHTML = `R$: ${totalAPagar.toFixed(2)}`;
    
    pagamento.appendChild(pag);
    pagamento.appendChild(pagInfo);
    pag.appendChild(sub_total);
    pag.appendChild(fretePago);
    pag.appendChild(totalPagar);
    pagInfo.appendChild(valorSub_total)
    pagInfo.appendChild(Valorfrete);
    pagInfo.appendChild(valorTotalPagar);
    
  }

function remover (index) {
  
  games.splice(games.indexOf(index), 1);
  gamesNoCarrinho(games);
  valorGamesNoCarrinho(games)
  if(games == 0 ) carrinhoVazio();
  
}

function limpar(elemento) { 
  while(elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
 }

 function finalizarCompra() {
  let carrinho = document.getElementById('compras');
  let valorCarrinho = document.getElementById('pagamento');
  document.getElementById('finalizar').style.display = 'none';
  // document.getElementById('carroIcon').style.display = 'block';
  games = [];
  limpar(carrinho);
  limpar(valorCarrinho);
  carrinhoVazio()
  alert("compara realizada com sucesso");
}

function carrinhoVazio() {
  limpar(compras)
  limpar(pagamento)
  const carro = document.createElement('img');
  carro.id = 'imagem';
  carro.className = "img-carro";
  carro.src = '../assets/cart-icon.svg';
    
  const sub = document.createElement('h3')
  sub.className = "sub";
  sub.innerHTML = "Até o momento, o seu carrinho está vazio";

  document.getElementById('carroIcon').style.display = 'block';
  document.getElementById('finalizar').style.display = 'none';
  
  compras.appendChild(sub);

}

function calculoTotalAPagar(games) {
  // console.log(games)
  subtotal = games.reduce((total, elemento) => total + elemento.Valor, 0)
  if(subtotal < 250){
    frete = games.length * 10;
    
  }else{
    frete = 0;
  }
  return subtotal +frete;   
}