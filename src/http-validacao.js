import chalk from "chalk";

function extraiLinks(arrayLinks){
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function chegaStatus(arrayUrls){
    return await Promise.all(
        arrayUrls.map(async (objetoUrl) => {
            try{
                const response = await fetch(objetoUrl)
                return response.status
            }catch (erro){
                manejaErros(erro)
            }
        })
    )
}

function manejaErros(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado';
    }else{
        return 'ocorreu algum erro'
    }
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks)
    const status = await chegaStatus(links)

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}