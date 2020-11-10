function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")//observando o select que tenha o noame "uf"

    // fetch vai no site da api, caso dê tudo certo o then vai responder, os dados essa resposta vai ser "transformado" em uma json através de uma função anônima, tendo sucesso o proximo then vai através de um for, atribuir um valor do states ao parametro states e se repetir até o fim do array de estados da api, e logo após isso atribuir na const ufSelect, o objeto state id a cada (state) e inserir no html com a tag option
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()})
    .then((states) => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }     
    })
}
populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = false 
    fetch(url)
    .then((res) => {return res.json()})
    .then((cities) => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false   
    })


}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li");
for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = event.target.dataset.id;
    itemLi.classList.toggle("selected")
    const alreadySelected = selectedItems.findIndex( (item) => {
        const itemFound = item == itemId
        return itemFound
    })
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems

    } else{
        selectedItems.push(itemId)
    }
   collectedItems.value = selectedItems
}           