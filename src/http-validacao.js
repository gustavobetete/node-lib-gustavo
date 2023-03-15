function extraiLinks(arrayLinks){
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function chegaStatus(arrayUrls){
    const arrayStatus = await Promise.all(
        arrayUrls.map(async (objetoUrl) => {
            const response = await fetch(objetoUrl)
            return response.status
        })
    )
    return arrayStatus
}

export default async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks)
    const status = await chegaStatus(links)
    console.log(status)
    return status;
}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)