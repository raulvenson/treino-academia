/*

Variáveis Globais

*/
let web_service = "treinos.json";
let data_json;
let index_cervejaria = 0;
let cervejarias = document.getElementById("cervejarias");
let cervejas = document.getElementById("cervejas");
let cervejas_content = document.getElementById("cervejas_content");
let btnVoltar = document.getElementById("btnVoltar");
let title_cervejaria = document.getElementById("title_cervejaria");
let btInstall = document.getElementById("btInstall");
let celular_compra = "6599271048";     
let nome_cervejaria;
/*

Funções Principais

*/

//Trazer dado do servidor
function loadData(){

    let ajax = new XMLHttpRequest();

    ajax.open("GET", web_service, true);
    ajax.send();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            data_json = JSON.parse(this.responseText);
            //console.log(data_json);
            printCervejarias();
            cacheDinamico();
        }
        
    }

}

loadData();

//Montar o card de cervejarias
function printCervejarias(){

    let html_cervejarias = '<div class="row">';

    if(data_json.length > 0){

        for(let i = 0; i<data_json.length; i++){
            html_cervejarias += card_cervejarias(i, data_json[i].name,
                 data_json[i].address, data_json[i].image, data_json[i].site,
                 data_json[i].exercise1, data_json[i].exercise2, data_json[i].exercise3, 
                 data_json[i].exercise4, data_json[i].exercise5, data_json[i].exercise6, data_json[i].exercise7);
        }

    }else{
        html_cervejarias = msg_alert("Não há cervejarias cadastradas", "warning");
    }

    html_cervejarias += '</div>';

    cervejarias.innerHTML = html_cervejarias;

}

function printCerveja(id, nome){
    window.scrollTo(0,0);
    nome_cervejaria = nome;
    title_cervejaria.innerHTML = nome;
    cervejarias.style.display = "none";
    cervejas.style.display = "block";

    let html_cervejas = '<div class="row">';

    if(data_json[id].beers.length > 0){

        for(let i = 0; i<data_json[id].beers.length; i++){
            html_cervejas += card_cervejas(data_json[id].beers[i].active, data_json[id].beers[i].alcohol, data_json[id].beers[i].description, data_json[id].beers[i].glass, data_json[id].beers[i].image, data_json[id].beers[i].name, data_json[id].beers[i].seasonal, data_json[id].beers[i].style);
        }

    }else{
        html_cervejas = msg_alert("Não há cervejas cadastradas para esta cervejaria", "warning");
    }

    cervejas_content.innerHTML = html_cervejas;
}

function changeModal(name,active,alcohol,glass,style,description){

    document.getElementById("nome_cerveja").innerHTML = name;
    document.getElementById("desc_cerveja").innerHTML =  "<strong>Descrição:</strong>&nbsp;"+description;
    document.getElementById("venda_cerveja").innerHTML = "<strong>Em venda:</strong>&nbsp;"+active;
    document.getElementById("alcool_cerveja").innerHTML =  "<strong>Teor alcólico:</strong>&nbsp;"+alcohol;
    document.getElementById("copo_cerveja").innerHTML =  "<strong>Copo Recomendado:</strong>&nbsp;"+glass;
    document.getElementById("estilo_cerveja").innerHTML = "<strong>Estilo:</strong>&nbsp;"+style;

}

function voltarTela(){    
    cervejarias.style.display = "block";
    cervejas.style.display = "none";
}

const CACHE_DINAMICO = "wikicerva_dinamico";

let cacheDinamico = function(){

    if('caches' in window){

        let ARQUIVOS_DINAMICOS = [web_service];
        
        caches.delete(CACHE_DINAMICO).then(function(){

            if(data_json.length > 0){

                for(let i = 0; i < data_json.length; i++){

                    if(ARQUIVOS_DINAMICOS.indexOf(data_json[i].image) == -1){
                        ARQUIVOS_DINAMICOS.push(data_json[i].image);
                    }

                    for(let j = 0; j < data_json[i].beers.length; j++){
                    
                        if(ARQUIVOS_DINAMICOS.indexOf(data_json[i].beers[j].image) == -1){
                            ARQUIVOS_DINAMICOS.push(data_json[i].beers[j].image);
                        }                        
                    }
                }

                caches.open(CACHE_DINAMICO).then(function(cache){

                    cache.addAll(ARQUIVOS_DINAMICOS).then(function(){

                        console.log("Cache dinâmico realizado com sucesso!");

                    });

                });

            }

        })

    }

}

/*

Botão de Instalação

*/

let janelaInstalacao = null;

window.addEventListener('beforeinstallprompt', gravarJanela);

function gravarJanela(evt){
    janelaInstalacao = evt;
}

let inicializarInstalacao = function(){

    setTimeout(function(){

        if(janelaInstalacao != null){
            btInstall.removeAttribute("hidden");
        }

    },500);

    btInstall.addEventListener("click", function(){

        btInstall.setAttribute("hidden", true);
        btInstall.hidden = true;

        janelaInstalacao.prompt();

        janelaInstalacao.userChoice.then((choice) => {

            if(choice.outcome === "accepted"){

                console.log("Usuário instalou o app!");

            }else{
                console.log("Usuário NÃO instalou o app!");
                btInstall.hidden = false;
                btInstall.removeAttribute("hidden");
            }

        });

    });

}

/*

Primitive Template Engines

*/

msg_alert = function(texto, style){
    return '<div class="alert alert-'+style+'" role="alert">'+texto+'</div>';
}

card_cervejarias = function(id, nome, descricao, imagem, site, exercise1,exercise2,exercise3,exercise4,exercise5,exercise6,exercise7){
    return `<div class="col-12 col-lg-6">            
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
                                <img src="${imagem}" class="logo_cervejaria">
                                </div>                      
                            </div>
                            <div class="col-8">   
                                <h5 class="card-title">${nome}</h5>
                                <p class="card-text">${exercise1}</p>
                                <p class="card-text">${exercise2}</p>
                                <p class="card-text">${exercise3}</p>
                                <p class="card-text">${exercise4}</p>
                                <p class="card-text">${exercise5}</p>
                                <p class="card-text">${exercise6}</p>
                                <p class="card-text">${exercise7}</p>
                                            
                            </div>
                        </div>              
                    </div>
                    <div class="card-footer">
                    <div class="btn-group w-100" role="group" aria-label="Ações">
                        <button class="btn btn-primary btn-purple w-50">Ver Treino</button>
                        <a href="${site}" onClick="javascript:formataMensagem('asdas')" target="_blank" class="btn btn-compartilhar w-50 btn-whatsapp">Compartilhar</a>
                    </div>
                    </div>
                </div>
            </div> `;
}

card_cervejas = function(active, alcohol, description, glass, image, name, seasonal, style){

    return `<div class="col col-lg-4">            
                <div class="card h-100">
                <div class="card-body">
                    <span class="container_cerveja"><img src="images/cerveja_001.png" class="image_cerveja"></span>
                    <h5 class="card-title">${name}</h5>                                                            
                </div>
                <div class="card-footer">
                    <div class="btn-group w-100" role="group" aria-label="Ações">
                    <a href="#" class="btn btn-warning w-50" data-bs-toggle="modal" data-bs-target="#modalCerveja" onClick="javascript:changeModal('${name}','${active}','${alcohol}','${glass}','${style}','${description.replace(/(\r\n|\n|\r)/gm, "")}')">Ver Informações</a>
                    <a href="#" onClick="javascript:formataMensagem('${name}')" class="btn btn-success w-50 btn-whatsapp">Comprar</a>
                    </div>
                </div>
                </div>
            </div>`;

}

/*

Funções Extras

*/

function formataMensagem(cerveja){

    var mensagem = "Se liga na meu treinão de hoje:\nxxxxxx\nxxxxxx\nxxxxxx\nxxxxxx\nxxxxxx";
    
    enviarWhatsApp(mensagem,celular_compra);

}


function enviarWhatsApp(mensagem,celular){    
  
    if(celular.length < 13){
        celular = "55" + celular;
    }
  
    var texto = mensagem;
    texto = window.encodeURIComponent(texto);
    
    let urlApi = "https://api.whatsapp.com/send";
    
    window.open(urlApi + "?phone=" + celular + "&text=" + texto, "_self");
}
