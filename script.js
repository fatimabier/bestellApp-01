var basket = [];
let summe = 0;

function init() {
    renderMenu();
    renderBasket();
}

function renderMenu() {
    let burgerRef = document.getElementById('burger_content');
    let pizzaRef = document.getElementById('pizza_content');
    let saladRef = document.getElementById('salad_content');

    burgerRef.innerHTML = '';
    pizzaRef.innerHTML = '';
    saladRef.innerHTML = '';

    fillMenuCategories(burgerRef, pizzaRef, saladRef);
}

function fillMenuCategories(burgerRef, pizzaRef, saladRef) {
    for (let i = 0; i < dishes.length; i++) {
        let myClass = getCardClass(i);
        let priceFormatted = dishes[i].preis.toFixed(2).replace('.', ',') + '€';
        let card = getDishHTML(dishes[i], myClass, priceFormatted);
        if (dishes[i].category == 'burger') burgerRef.innerHTML += card;
        if (dishes[i].category == 'pizza') pizzaRef.innerHTML += card;
        if (dishes[i].category == 'salad') saladRef.innerHTML += card;
    }
}

function getCardClass(index) {
    let myClass = '';
    if (index == 0) { myClass = 'burger_card_1'; }
    if (index == 1) { myClass = 'burger_card_2'; }
    if (index == 2) { myClass = 'burger_card_3'; }
    if (index == 3) { myClass = 'burger_card_4'; }
    if (index == 4) { myClass = 'pizza_card_1'; }
    if (index == 5) { myClass = 'pizza_card_2'; }
    if (index == 6) { myClass = 'pizza_card_3'; }
    if (index == 7) { myClass = 'salad_card_1'; }
    if (index == 8) { myClass = 'salad_card_2'; }
    if (index == 9) { myClass = 'salad_card_3'; }
    if (myClass == '') { myClass = 'burger_card_1'; }
    return myClass;
}

function addToBasket(name, price) {
    let found = checkBasketForDish(name);
    if (found == false) {
        basket.push({
            name: name,
            price: price,
            amount: 1
        });
    }
    renderBasket();
}

function checkBasketForDish(name) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name == name) {
            basket[i].amount = basket[i].amount + 1;
            return true;
        }
    }
    return false;
}

function renderBasket() {
    let contentRef = document.getElementById('basket_content');
    contentRef.innerHTML = '';
    summe = 0;

    if (basket.length == 0) {
        showEmptyBasket(contentRef);
        updateMobileCounter(0);
        return;
    }

    showFullBasket(contentRef);
}

function showEmptyBasket(contentRef) {
    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    contentRef.innerHTML = getEmptyBasketTemplate();
    if (totalSection) totalSection.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
}

function showFullBasket(contentRef) {
    let totalSection = document.querySelector('.basket_total_section');
    let checkoutBtn = document.getElementById('checkout_btn');

    if (totalSection) totalSection.style.display = 'block';
    if (checkoutBtn) checkoutBtn.style.display = 'block';

    renderBasketItems(contentRef);
    updateBasketTotal(summe);
}

function renderBasketItems(contentRef) {
    let totalItems = 0;

    for (let i = 0; i < basket.length; i++) {
        let totalPrice = (basket[i].price * basket[i].amount).toFixed(2);
        let totalPriceFormatted = totalPrice.replace('.', ',');
        contentRef.innerHTML += getBasketItem(i, basket[i].name, basket[i].amount, totalPriceFormatted);
   }
}

function updateBasketTotal(totalAmount) {
    let formatted = totalAmount.toFixed(2).replace('.', ',');
    let totalSpan = document.getElementById('total_sum');
    let btn = document.getElementById('checkout_btn');

    if (totalSpan) totalSpan.innerHTML = formatted + ' €';
    if (btn) btn.innerHTML = 'Bezahlung (' + formatted + ' €)';
}

function deleteItem(index) {
    basket.splice(index, 1);
    renderBasket();
}

function removeAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1);
    }
    renderBasket();
}

function addAmount(index) {
    basket[index].amount++;
    renderBasket();
}




