function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

document
    .querySelector("select[name = uf]")
    .addEventListener( "change", getCities )


populateUFs()


//Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener( "click", handleSelectedItem )
}

const collectedItems = document.querySelector("input[name=itens]")

let selectedItems = []

function handleSelectedItem () {
    const itemLi = event.target

    // add ou remover classe com javascript

    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    

    //Verificar se existem items selecionados
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso vai ser verdadeiro ou falso 
        return itemFound

    })

    //se ja estiver selecionado, tirar da selecao
    if ( alreadySelected >= 0) {
        const filteredItem = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItem
    } else {
        selectedItems.push(itemId)
    }


    //se nao estiver selecionado, add a seleção

    //atualizar o campo escondido com os items selecionado

    collectedItems.value = selectedItems
}