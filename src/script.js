const menu = document.querySelector('#menu')
const modalCart = document.querySelector('#cart-modal')
const btnCart = document.querySelector('#cart-btn')
const bntCloseModalCart = document.querySelector('#close-modal-btn')
const containerItemsCarrinho = document.querySelector('#cart-items')
const priceTotal = document.querySelector('#cart-total')
const btnFinalizarPedido = document.querySelector('#checkount-btn')
const countCart = document.querySelector('#cart-count')
const inputAddress = document.querySelector('#address')
const spanErroInput = document.querySelector('#address-warn')
let cart = []

function showModalCart() {
  modalCart.style.display = 'flex'
}

function closeModalCart() {
  modalCart.style.display = ''
}

function handleMenu({target}) {
  let btnComprar = target.closest('.add-to-card-btn')

  if (btnComprar) {
    const name = btnComprar.dataset.name
    const price = parseFloat(btnComprar.dataset.price)
    
    addToCard(name, price)
  }
}

function addToCard(name, price) {

  const existingItem = cart.find(item => item.name === name)

  if (existingItem) {
    existingItem.quantity += 1
  }else{
    cart.push({
      name,
      price,
      quantity: 1
    })
  }

  updateCardModal()
}

function updateCardModal() {
  containerItemsCarrinho.innerHTML = ""
  let total = 0

  cart.forEach(pedido => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('flex', 'mb-4', 'justify-between', 'flex-col', 'w-full')
    cartItemElement.innerHTML = `
      <div class="flex justify-between items-center border-2 p-3 rounded border-zinc-300 shadow-md">
        <div class="text-left *:font-bold">
          <p>${pedido.name}</p>                
          <p> Quantidade: ${pedido.quantity}</p>                
          <p class="font-midium mt-2">R$ ${pedido.price.toFixed(2)}</p>                
        </div>
        <buttom class="remove-from-cart-btn cursor-pointer bg-red-600 py-2 px-4 text-white rounded-md hover:opacity-80" data-name="${pedido.name}">Remover</buttom>
      </div>
    `

    total += pedido.price * pedido.quantity
    containerItemsCarrinho.appendChild(cartItemElement)
  })

  priceTotal.textContent = total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
  countCart.innerHTML = cart.length

  if (containerItemsCarrinho.innerHTML === "") {
    containerItemsCarrinho.innerHTML = 'Carrinho Vazio!'
  }

}

function removeItemCart({target}) {
  if (target.classList.contains('remove-from-cart-btn')) {
    const name = target.dataset.name
    removeCard(name)
  }
}

function removeCard(name) {
  const index = cart.findIndex(pedido => pedido.name === name)
  
  if (index !== -1) {
    const pedido = cart[index]
    
    if (pedido.quantity > 1) {
      pedido.quantity -= 1
      updateCardModal()
      return
    }

    cart.splice(index, 1)
    updateCardModal()
  }
}

inputAddress.addEventListener('input', ({target}) => {
  let inputValue = target.value
  if (inputValue.length > 0) {
    spanErroInput.style.display = ''
    inputAddress.classList.add('border-zinc-400')
    inputAddress.classList.remove('border-red-500')
  }
})

btnFinalizarPedido.addEventListener('click', () => {
  if(cart.length === 0)return

  if (inputAddress.value === "") {
    spanErroInput.style.display = 'block'
    inputAddress.classList.remove('border-zinc-400')
    inputAddress.classList.add('border-red-500')
  }
})

containerItemsCarrinho.addEventListener('click', removeItemCart)
menu.addEventListener('click', handleMenu)
modalCart.addEventListener('click', event => {
  if (event.target === modalCart) {
    closeModalCart()
  }
})
btnCart.addEventListener('click', showModalCart)
bntCloseModalCart.addEventListener('click', closeModalCart)