console.log('[DevSoutinho] Flappy Bird');

const somDeHit = new Audio();
somDeHit.src = './efeitos/hit.wav';

const sprites = new Image(); //utilizar o arquivo de imagem
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas'); // selecionar elemento canva do HTML 
const contexto = canvas.getContext('2d'); // definir jogo em 2d

function fazColisao(flappyBird,chao){
   const flappyBirdY = flappyBird.y + flappyBird.altura;
   const chaoY = chao.y;

   if(flappyBirdY >= chaoY) {
       return true;
   }
   return false;
}

function criaFlappyBird() {
     const flappyBird = {
        SpriteX: 0,
        SpriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo : 4.6,
        atualiza() {
            if(fazColisao(flappyBird,chao)) {
                console.log('fez colisão');
                somDeHit.play();

                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 500);
                
                return;
            }
            
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
    
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.SpriteX, flappyBird.SpriteY, //sprite x, sprite y
                flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
                );    
        },
    
        voa() {
            flappyBird.velocidade = - flappyBird.pulo;
        }
    }
    return flappyBird;
}


//tela de inicio
const inicio = {
    SpriteX: 134,
    SpriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width/2) - 174/2 ,
    y: 50 ,
    desenha() {
        contexto.drawImage(
            sprites,
            inicio.SpriteX, inicio.SpriteY, //sprite x, sprite y
            inicio.largura, inicio.altura, // tamanho do recorte na sprite
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
            ); 

        }
}


// [chao]
const chao = {
    SpriteX: 0,
    SpriteY: 611,
    largura: 224,
    altura: 111,
    x: 0,
    y: canvas.height - 111,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.SpriteX, chao.SpriteY, //sprite x, sprite y
            chao.largura, chao.altura, // tamanho do recorte na sprite
            chao.x, chao.y,
            chao.largura, chao.altura,
            ); 

            contexto.drawImage(
                sprites,
                chao.SpriteX, chao.SpriteY, //sprite x, sprite y
                chao.largura, chao.altura, // tamanho do recorte na sprite
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
                ); 
    }
}

const fundo = {
    SpriteX: 391,
    SpriteY: 1,
    largura: 275,
    altura: 204,
    x: 0,
    y: 200,
    desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            fundo.SpriteX, fundo.SpriteY, //sprite x, sprite y
            fundo.largura, fundo.altura, // tamanho do recorte na sprite
            fundo.x, fundo.y,
            fundo.largura, fundo.altura,
            ); 

            contexto.drawImage(
                sprites,
                fundo.SpriteX, fundo.SpriteY, //sprite x, sprite y
                fundo.largura, fundo.altura, // tamanho do recorte na sprite
                (fundo.x + fundo.largura), fundo.y,
                fundo.largura, fundo.altura,
                ); 
    }
}

const cano1 = {
    SpriteX: 0,
    SpriteY: 168,
    largura: 52,
    altura: 401,
    x: 10,
    y: 200,
    desenha() {
        contexto.drawImage(
            sprites,
            cano1.SpriteX, cano1.SpriteY, //sprite x, sprite y
            cano1.largura, cano1.altura, // tamanho do recorte na sprite
            cano1.x, cano1.y,
            cano1.largura, cano1.altura,
            ); 
    }
}

const cano2 = {
    SpriteX: 52,
    SpriteY: 168,
    largura: 52,
    altura: 401,
    x: 70,
    y: 200,
    desenha() {
        contexto.drawImage(
            sprites,
            cano2.SpriteX, cano2.SpriteY, //sprite x, sprite y
            cano2.largura, cano2.altura, // tamanho do recorte na sprite
            cano2.x, cano2.y,
            cano2.largura, cano2.altura,
            ); 
    }
}

// Telas
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
     telaAtiva = novaTela;
     if (telaAtiva.inicializa) {
         telaAtiva.inicializa();
     }
}


const Telas = {
    INICIO : {
        inicializa() {
           globais.flappyBird = criaFlappyBird(); 
        },
        desenha () {
            fundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha(); 
            inicio.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha (){
      fundo.desenha();
      chao.desenha();
      globais.flappyBird.desenha();
    },
    click(){
       globais.flappyBird.voa();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
};

function loop() {
     telaAtiva.desenha();
     telaAtiva.atualiza();
    //cano1.desenha();
    //cano2.desenha();
    requestAnimationFrame(loop);
};

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
})


mudaParaTela(Telas.INICIO);
loop();
