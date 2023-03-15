import pegaArquivo2 from "./index.js";
import chalk from "chalk";
import * as fs from 'fs';

const caminho = process.argv;

function imprimeLista(resultado, identificador){
    console.log(
        chalk.blue(`Lista de links ${chalk.black.bgGreen(identificador)} ${JSON.stringify(resultado)}.`),

    );
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];

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
       imprimeLista(resultado)
    }else if(fs.lstatSync(caminho).isDirectory()){
       const arquivos = await fs.promises.readdir(caminho);
       for (const nomeDeArquivo of arquivos) {
          const lista = await pegaArquivo2(`${caminho}/${nomeDeArquivo}`)
          imprimeLista(lista, nomeDeArquivo)
       }
    }
}

processaTexto(caminho);