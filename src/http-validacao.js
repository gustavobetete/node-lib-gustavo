function extraiLinks(arrayLinks){
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join())
}

export default function listaValidada(listaDeLinks){
    return extraiLinks(listaDeLinks)
}