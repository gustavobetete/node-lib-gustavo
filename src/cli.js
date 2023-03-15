import pegaArquivo2 from "./index.js";
import chalk from "chalk";
import * as fs from 'fs';
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

function imprimeLista(valida, resultado, identificador){
    if(valida){
        console.log(
            chalk.blue(`Lista validada ${JSON.stringify(listaValidada(resultado))}.`),
        );
    }else{
        console.log(
            chalk.blue(`Lista de links ${chalk.black.bgGreen(identificador)} ${JSON.stringify(resultado)}.`),
        );
    }
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try{
        fs.lstatSync(caminho);
    }catch (e) {
        if(e.code === 'ENOENT'){
            console.log('arquivo ou diretório não existe')
            return;
        }
    }

    if(fs.lstatSync(caminho).isFile()){
       const resultado = await pegaArquivo2(argumentos[2])
       imprimeLista(valida, resultado)
    }else if(fs.lstatSync(caminho).isDirectory()){
       const arquivos = await fs.promises.readdir(caminho);
       for (const nomeDeArquivo of arquivos) {
          const lista = await pegaArquivo2(`${caminho}/${nomeDeArquivo}`)
          imprimeLista(valida, lista, nomeDeArquivo)
       }
    }
}

processaTexto(caminho);