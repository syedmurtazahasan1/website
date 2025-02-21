import { createComponent } from '../utils/dom.js';

export class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        return `
            <a href="product.html?id=${this.product.id}" 
               class="product-card"
               data-product-id="${this.product.id}">
                <img class="product-card__image" 
                     src="${this.product.image}" 
                     alt="${this.product.name}"
                     loading="lazy">
                <div class="product-card__content">
                    <h3 class="product-card__title">${this.product.name}</h3>
                    <span class="product-card__price">$${this.product.price.toFixed(2)}</span>
                    <span class="product-card__category">${this.product.category}</span>
                </div>
            </a>
        `;
    }
}
