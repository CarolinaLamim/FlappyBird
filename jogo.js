console.log('[DevSoutinho] Flappy Bird');

let frames = 0;

const somDeHit = new Audio();
somDeHit.src = './efeitos/hit.wav';

const sprites = new Image(); //utilizar o arquivo de imagem
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas'); // selecionar elemento canva do HTML 
const contexto = canvas.getContext('2d'); // definir jogo em 2d

function fazColisao(flappyBird, chao){
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
            if(fazColisao(flappyBird,globais.chao)) {
                console.log('fez colisão');
                somDeHit.play();

               
                mudaParaTela(Telas.GAME_OVER);
               
                
                return;
            }
            
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
    
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, },
            { spriteX: 0, spriteY: 26, },
            { spriteX: 0, spriteY: 52, },
            { spriteX: 0, spriteY: 26, },
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
             const baseDoIncremento = 1;
             const incremento = baseDoIncremento + flappyBird.frameAtual;
             const baseRepeticao = flappyBird.movimentos.length;
             flappyBird.frameAtual = incremento % baseRepeticao;
            }
             
        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];


            contexto.drawImage(
                sprites,
                spriteX, spriteY, //sprite x, sprite y
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

const mensagemGameOver = {
    SpriteX: 134,
    SpriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width/2) - 226 / 2 ,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.SpriteX, mensagemGameOver.SpriteY, //sprite x, sprite y
            mensagemGameOver.largura, mensagemGameOver.altura, // tamanho do recorte na sprite
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.largura, mensagemGameOver.altura,
            ); 

        }
}

// [chao]
function criaChao(){
    const chao = {
        SpriteX: 0,
        SpriteY: 611,
        largura: 224,
        altura: 111,
        x: 0,
        y: canvas.height - 111,
        atualiza(){
           const movimentoDoChao = 1;
           const repeteEm = chao.largura / 2;
           const movimentacao = chao.x - movimentoDoChao;
           chao.x = movimentacao % repeteEm;
           
        }, 
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
    return chao;
}

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 401,
        chao: {
            SpriteX: 0,
            SpriteY: 169,
        },
        ceu: {
            SpriteX: 52,
            SpriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par) {
            
            const yRandom = par.y;
            const espacamentoEntreCanos = 90;

            const canoCeuX = par.x;
            const canoCeuY = yRandom;
            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
            
                contexto.drawImage(
                    sprites,
                    canos.ceu.SpriteX, canos.ceu.SpriteY, //sprite x, sprite y
                    canos.largura, canos.altura, // tamanho do recorte na sprite
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                    ); 
    
                contexto.drawImage(
                        sprites,
                        canos.chao.SpriteX, canos.chao.SpriteY, //sprite x, sprite y
                        canos.largura, canos.altura, // tamanho do recorte na sprite
                        canoChaoX, canoChaoY,
                        canos.largura, canos.altura,
                        ); 
                        
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY,
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })          
            
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
            
            if(globais.flappyBird.x + globais.flappyBird.largura >= par.x) {
                 
                if(cabecaDoFlappy <= par.canoCeu.y){
                     return true;
                }

                if(peDoFlappy >= par.canoChao.y){
                    return true;
                }
            }
        
            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
           if(passou100Frames) {
               canos.pares.push( {
                x: canvas.width,
                y: - 150 * (Math.random() + 1),
            });
           } 

           canos.pares.forEach(function(par)  {
             par.x = par.x - 2;

             if(canos.temColisaoComOFlappyBird(par)){
                somDeHit.play();
                mudaParaTela(Telas.GAME_OVER);
             }

             if(par.x + canos.largura <= 0) {
                canos.pares.shift();
             }
           });
        }
    }
    return canos;
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

function criaPlacar(){
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);    
            contexto.textAlign = 'right';
          
        },
        atualiza(){
            const intervaloDeFrames = 20;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
              placar.pontuacao = placar.pontuacao + 1;  
            }
            
        }
    }
    return placar;
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
           globais.chao = criaChao();
           globais.canos = criaCanos();
        },
        desenha () {
            fundo.desenha();
           
            globais.flappyBird.desenha(); 
            
            globais.chao.desenha();
            inicio.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO)
        },
        atualiza() {
            globais.chao.atualiza();
          
        }
    }
};

Telas.JOGO = {
    inicializa(){
     globais.placar = criaPlacar();
    },
    desenha (){
      fundo.desenha();
      globais.chao.desenha();
      globais.canos.desenha();
      globais.flappyBird.desenha();
      globais.placar.desenha();
    },
    click(){
       globais.flappyBird.voa();
    },
    atualiza() {
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza(); 
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    desenha(){
       mensagemGameOver.desenha();
    },
    atualiza(){

    },
    click(){
      mudaParaTela(Telas.INICIO);  
    }
}

function loop() {

     telaAtiva.desenha();
     telaAtiva.atualiza();
    //cano1.desenha();
    //cano2.desenha();

    frames = frames + 1;
    requestAnimationFrame(loop);
};

window.addEventListener('click', function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
})


mudaParaTela(Telas.INICIO);
loop();
