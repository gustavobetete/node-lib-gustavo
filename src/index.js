import chalk from 'chalk'; // muda cor do texto do terminal
import * as fs from 'fs';

function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'))
}

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados =  capturas.map((el) => ({[el[1]]: el[2]}));
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}

//função utilizando promises com then >>> assíncrona

function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    fs.promises.readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.blue(texto)))
        .catch((erro) => trataErro(erro))
}

// async/await

async function pegaArquivo2(caminhoDoArquivo){
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto)
    }catch (erro){
        trataErro(erro)
    }finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

export default pegaArquivo2;
