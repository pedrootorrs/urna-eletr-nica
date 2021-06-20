let seuVoto = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let numeros = document.querySelector(".d-1-3");
let descricao = document.querySelector(".d-1-4");
let lateral = document.querySelector(".d-1-right");
let aviso = document.querySelector(".d-2");

let currentStep = 0;
let numero ="";
let votoEmBranco = false;


function startStep() {
    let step = steps[currentStep];

    let numeroHtml = ''; 
    numero = '';
    votoEmBranco = false;
    
    for(let i=0;i<step.numeros;i++) {
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else{
        numeroHtml += '<div class="numero"></div>';
    }}

    seuVoto.style.display = 'none';
    cargo.innerHTML = step.titulo;
    numeros.innerHTML = numeroHtml;
    descricao.innerHTML = '';
    lateral.innerHTML = '';
    aviso.style.display = 'none';
}

function atualiza() {
    let step = steps[currentStep];
    let candidato = step.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        if(candidato.vice !== undefined){
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/> Vice: ${candidato.vice}`;
        } else{
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;
        }

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
            fotosHtml += `<div class="d-1-image small"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
        } else {
            fotosHtml += `<div class="d-1-image"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
        }
    }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        } else{
            atualiza();
        }
    }
}
function branco() {
        numero = '';
        votoEmBranco = true;
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
}
function corrige() {
    startStep();

}
function confirma() {
    let step = steps[currentStep];

    let votoConfirmado = false;

    if(votoEmBranco === true){
        votoConfirmado = true;
        alert("CONFRIMANDO COMO VOTO EM BRANCO...")
    } else if(numero.length === step.numeros){
        votoConfirmado = true;
        alert("CONFRIMANDO COMO "+numero)
    }

    if(votoConfirmado){
        currentStep++;
        if(steps[currentStep] !== undefined){
            startStep();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="aviso--final pisca">FIM</div>'
        }
    }
}

startStep();