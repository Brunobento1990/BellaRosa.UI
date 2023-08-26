import { updateCart } from "src/layouts/dashboard/top-nav";

export function useContext() {

    function setCart(productId, quantidade) {

        if (quantidade == 0) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let cartUpdated = false;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].produtoId === productId) {
                cart[i].quantidade += quantidade;
                cartUpdated = true;
                break;
            }
        }

        if (!cartUpdated) {
            const produtoCart = {
                produtoId: productId,
                quantidade: quantidade
            };
            cart.push(produtoCart);
        }

        updateCart(cart.length)

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    function getLengthCart(){
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        return cart.length;
    }

    return {
        setCart,
        getLengthCart,
    }
}