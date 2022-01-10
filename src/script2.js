let data = [];
const games = [];
var preco_games =0;
var valoresGame =0;
var subtotal = 0;
var frete = 0;
var totalAPagar = 0;
let flag = 0;
var ListaCompras = [0]

async function getDados() {
  await fetch('../data/products.json')
    .then(resposta => resposta.json())
    .then( json => {
      renderCards(json)
     data = json
    })
} 

getDados()

// FUNÇÃO CRIADA PARA RANDERIZAR A PAGINA
function renderCards(data) {
  limpar(container)
  carrinhoIcon(games)


  data.forEach( index => {

    const card = document.createElement('div');
    card.className = "card";

    const Image = document.createElement('img');
    Image.src = index.image;

    const nome = document.createElement('div');
    nome.className ="name";
    nome.innerHTML = index.name;

    const span = document.createElement('span');
    span.className = "add";
    span.innerHTML = "Adcionar no Carrinho";
    span.addEventListener('click',() => AddCarrinho(index.name, index.image, index.price));

    const preco = document.createElement('div');
    preco.className ="price";
    preco.innerHTML = `R$ ${index.price}`;


    container.appendChild(card);
    card.appendChild(Image)
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(span);

  });
}

// FILTRO  POR NOME, PREÇO OU POPULARIDADE
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


// const compras = document.getElementById('compras');

  // const botao= document.getElementById('finalizar'); 

  // function renderProdutos (data) {
  //   // data = JSON.parse(this.responseText);
  //   console.log(data)
  //   // if (request.status >= 200 && request.status < 400) {
  //   data.forEach( index => {


  //       //console.log(data)
  //    const card = document.createElement('div');
  //    card.className = "card";



  //    const Image = document.createElement('img');
  //    Image.src = index.image;

  //    const h1 = document.createElement('div');
  //    h1.className ="name";
  //    h1.innerHTML = index.name;

  //    const span = document.createElement('span');
  //    span.className = "add";
  //    span.innerHTML = "Adcionar no Carrinho";
  //    span.addEventListener('click',() => AddCarrinho(index.name, index.image, index.price));
  //    //span.addEventListener('click',() => Adicionar())


  //    const h3 = document.createElement('div');
  //    h3.className ="price"
  //    h3.innerHTML = `R$ ${index.price}`;


  //    container.appendChild(card);

  //    card.appendChild(Image);
  //    card.appendChild(h1);

  //    card.appendChild(h3);
  //    card.appendChild(span);


  //   })
  // }
  
  function carrinhoIcon(games) {
    if(games.length == 0) {
      document.getElementById('carroIcon').style.display = 'block';
      } else {
      document.getElementById('carroIcon').style.display = 'none';
    
      }
  }
  
  //console.log(games.Nome)
//função para adicionar valor no carrinho, primeiro ela pega os valores mandados para o local storage
//apos isso, esse valor são armagenados em um array games
function AddCarrinho(nome, imagem, valor) {
  flag = 0;
  var lista = {
    
    Nome: nome,
    Valor: valor,
    Imagem: imagem,
  }
  games.push(lista);
  render_carrinho(games);
  carrinhoIcon(games);
  
}


// FUNÇÃO PARA RENDERIZAR O CARRINHO DE COMPRAS

function render_carrinho(games) {
  document.getElementById('carroIcon').style.display = 'none';

  // PRIMEIRO É PRECISO LIMPAT OS CARS, COM ESSES WHILES, PODEMOS REMOVER TODOS OS FILHOS
  // QUE EXISTEM EM CADA CARD, COM TODOS LIMPOS PODEMOS RENDERIZAR OS NOVOS
  const itens = document.createElement('div');
  limpar(compras)
  limpar(itens)

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
    
    
    // AQUI NOS PEGAMOS OS VALORES DO PREÇO ARMAZENADOS, CONVERTEMOS TODOS PARA FLOAT, POIS ELES
    //ANTERIORMENTE VÃO VIR COMO STRING. COM ESSES DADOS NOS OS ADICIONAMOS A UMA LISTA, QUE VAI
    // CONTER TODOS OS VALORES DE PREÇO EXIXTENTE NO CARRINHO.
    var valorCompra = document.getElementsByClassName('preco_game');
    for (var pos = 0; pos < valorCompra.length; pos++){
      valoresGame = parseFloat(valorCompra[pos].innerHTML);
      
    }
    if(!flag){
      ListaCompras.push(valoresGame);
      flag= 0;
    }
    // NESSE REDUCE PODEMOS PEGAR A LISTA E SOMAR TODOS OS VALORES DELA, TENTO ASSIM O VALOR DO SUBTOTAL
    console.log(ListaCompras)
    const subtotal = ListaCompras.reduce((total, currentElement) => total + currentElement);
    
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
    
  }else{
    
  // COM O CARRINHO VAZIO É PRECISO REMOVER TODOS OS ITENS QUE ALI ESTAVAM, NO CASO
// ESSE WHILES VÃO REMOVER TODOS OS "FILHOS" DE CADA DIV
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


    compras.appendChild(sub);
}


}
// FUNÇÃO PARA REMOVER ITENS DO CARRINHO E ATUALIZAR SO SUBTOTAL
function remover (index) {
  
  games.splice(games.indexOf(index), 1);
  var item = parseFloat(index.Valor);
  ListaCompras.splice(ListaCompras.indexOf(item), 1);
  flag = 1;
  carrinhoIcon(games)
  render_carrinho(games);
  
}

function limpar(elemento) { 
  while(elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
 }
