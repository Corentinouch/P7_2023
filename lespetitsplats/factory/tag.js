/* Tag */
function tagFactory() {

  function displayTagFactory() {

    let ingrFilter = document.getElementById('ingredientFilter')
    console.log(ingrFilter.value)
    let tag_input = document.createElement('div')
    tag_input.classList.add("tagInput")
    let tag = document.createElement('div')
    tag.classList.add("tag")
    tag.innerHTML = ingrFilter.value
    let closeBtn = document.createElement('span')
    closeBtn.classList.add("closeBtn")
    closeBtn.innerHTML = "close"

    tag_input.appendChild(tag)
    tag_input.appendChild(closeBtn)

    return tag_input
  }

  return { displayTagFactory };
}

export default tagFactory
