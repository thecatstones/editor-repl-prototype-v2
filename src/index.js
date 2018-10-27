import './style.css'

function component() {
  let element = document.createElement('div')
  console.log(42)
  return element
}

document.body.appendChild(component())
