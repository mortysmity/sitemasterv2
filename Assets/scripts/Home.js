//MENU RESPONSIVO
var contador = 1;
function main() {
  $('.fa-align-justify').click(function () {
    if (contador == 1) {

      $('.MenuLoja').animate({
        left: '0'
      });
      contador = 0;
    }
    else {
      contador = 1;
      $('.MenuLoja').animate({
        left: '-100%'
      });
    }
  })
}
main();


/*SLIDER*/
$('.slide').each(function () {
  var $this = $(this);
  var grupoSlide = $this.find('.slide-Grupo');
  var slide = $this.find('.slide-Imagem');
  var botaoArray = [];
  var indiceAtual = 0;
  var contarTempo;

  function moverSlide(newIndex) {
    var animacaoEsquerda;
    var slideEsquerda;

    avancar();
    //Se o ususario clicar no botao da mesma imagem apresentada na tela, nada acontece.
    if (grupoSlide.is(':animated') || indiceAtual === newIndex) {
      return;
    }
    botaoArray[indiceAtual].removeClass('active');
    botaoArray[newIndex].addClass('active');

    //aqui se define para onde o slide vai o slide
    if (newIndex > indiceAtual) {
      //da direita para esquerda
      slideEsquerda = '100%';
      animacaoEsquerda = '-100%';

    } else {
      //da esquerda para direita
      slideEsquerda = '-100%';
      animacaoEsquerda = '100%';
    }

    //sempre o slide mostrado na tela vai ser atribuido como display block
    slide.eq(newIndex).css({ left: slideEsquerda, display: 'block' });

    grupoSlide.animate({ left: animacaoEsquerda }, function () {
      slide.eq(indiceAtual).css({ display: 'none' }); //O slide que não são mostrado na tela será oculto
      slide.eq(newIndex).css({ left: 0 }); //saber o valor atual do newIndex, e passar left 0
      grupoSlide.css({ left: 0 });
      indiceAtual = newIndex;
    });
  }
  function avancar() {
    clearTimeout(contarTempo); //limpa o tempo atual
    contarTempo = setTimeout(function () {

      //Se não for o ultimo slide, vai fazer a contagem do tempo para passar o proximo slide
      if (indiceAtual < (slide.length - 1)) {
        moverSlide(indiceAtual + 1);
      }
      else {
        //voltando ao primeiro slide
        moverSlide(0);
      }
    }, 4000); //4 segundos
  }
  $.each(slide, function (index) {
    var botao = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === indiceAtual) {
      botao.addClass('active');
    }

    botao.on('click', function () {
      moverSlide(index);
    }).appendTo('.slide-Botao');
    botaoArray.push(botao); //adiciona o botao ao  um array
  });
  avancar();
});


/*FILTRO DOS QUADRIHNOS*/
(function () {

  var quadrinhos = $('.ContainerFlex .produtos-Quadrinho'); //pegando cada div com os quadrinhos

  //onde será armazenado os botoes
  var botao = $('.flitro-Botao');

  armazenaTags = {};

  //vai contar quantos produtos existem e adicionar em um array
  quadrinhos.each(function () {
    var $Hqs = this;
    var tags = $(this).data('tags');

    if (tags) {
      tags.split(',').forEach(function(nomeTag) {

        if (armazenaTags[nomeTag] == null) {
          armazenaTags[nomeTag] = [];
        }

         //Armazenas os produtos em um array
        armazenaTags[nomeTag].push($Hqs);
      });
    }
  });

  //Neste botão vai mostrar todos os produtos da loja
  $('<a/>', {
    text: "MOSTRAR TUDO",
    class: 'itemFiltro',
    click: function () {
      $(this).addClass('itemFiltro')
        .siblings()
        .removeClass('active');
      quadrinhos.show();
    }
  }).appendTo(botao);


  /*Para cada tag criada que esteja com o nome diferente vamos criar um botao*/
  $.each(armazenaTags, function (nomeTag) {
    $('<a/>', {
      text: nomeTag + '(' + armazenaTags[nomeTag].length + ')',
      style: 'color: black',
      class: 'itemFiltro',
      click: function () {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');

        quadrinhos
          .hide()
          .filter(armazenaTags[nomeTag])
          .show();
      }
    }).appendTo(botao);
  });
}()); //Fecha função

//Criando o accordion do menu de filtro
$('.Filtro').on('click', '.Series', function (e) {
  e.preventDefault();
  $(this)
    .next('.filtro-Series')
    .not(':animated')
    .slideToggle();
});


/*Ocultar as imagens que ficam superior a decima imagem*/
function ocultarImagens() {
  var contar = 20;
  for (var i = 0; i < contar; i++) {
    if (i > 10 || i == 10) {
      $('.produtos-Quadrinho').eq(i).css({
        display: 'none'
      });
    }
  }
}
ocultarImagens();

/*Criei um media query, para que ao diminuir a tela do navagador (com as outras imagens ocultas),
o total de imagens que o usuario vai ver serão 8, e não 10 imagens, 
porque com 10 imagens a ultima fileira de imagens vai ficar incompleta*/
var num = 0;
function mediaSize() {
  var contarImg = 10;
  if (window.matchMedia('(max-width: 960px)').matches) {
    for (var a = 0; a < contarImg; a++) {
      if ((a > 8 || a == 8) && num == 0) {    //Para saber se o botao esta ativo ou não

        /*Oculta as duas imagens que ficam sobrando em uma fileira de 4 imagens cada*/
        $('.produtos-Quadrinho').eq(a).css({
          display: 'none'
        });
      }
    }
  }
  else {
    /*Caso a tela for mais que 960px, as imagens voltam a aparecer*/
    for (var a = 0; a < contarImg; a++) {
      $('.produtos-Quadrinho').eq(a).css({
        display: 'block'
      });
    }
  }
}
mediaSize();
window.addEventListener('resize', mediaSize, false);

/*Ao click do botão, vai carregar mais imagens*/
$('.Ativar').on('click', function () {
  $('.produtos-Quadrinho').fadeIn('slow');
  num++;
});



