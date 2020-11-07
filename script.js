if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}


function ready(){
    var bouton = document.getElementsByClassName('test');

for(var i = 0; i < bouton.length; i++){
    var boutonClique = bouton[i];
    boutonClique.addEventListener('click', removeCartItem)
       // pour supprimer un item 
    
}
let quantityInput = document.getElementsByClassName('cart-quantity-input');
for (let i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener('change', quantityChanged);
    // pour la quantité des articles
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked(){
    alert('Perla vous remercie pour votre achat');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItem.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();

}

var addToCart = document.getElementsByClassName('shop-item-button')
for (let i = 0; i < addToCart.length; i++) {
    var button = addToCart[i];
    button.addEventListener('click', addToCartClicked);

}


function removeCartItem(event){
    var clicked = event.target;
        clicked.parentElement.parentElement.remove();
        updateTotal();
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemCart(title,price,imageSrc);
    updateTotal();
    
}

function addItemCart(title,price,imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('card-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title){
          alert('Cet article est déja dans votre panier');
          return 
      }
      
  }
    var cartRowContens = `
       <br><div class="cart-row">
 <div class="cart-item cart-column">
     <img class="cart-item-image" src=${imageSrc} width="100" height="100"><br>
     <span class="cart-item-title">${title}</span><br>
 </div>
 <span class="cart-price cart-column">${price}</span><br>
 <div class="cart-quantity cart-column">
     <input class="cart-quantity-input" type="number" value="1">
     <button class="test btn btn-primary" type="button">Effacer</button>
</div> `;
    cartRow.innerHTML = cartRowContens;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-primary')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
  
}

function updateTotal(){
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
for(var i = 0; i < cartRows.length; i++){
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
}
total = Math.round(total * 100) / 100;
document.getElementsByClassName('cart-total-price')[0].innerText =  total + '€';
}









    
