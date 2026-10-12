import { Page, Locator, expect } from '@playwright/test';


export class ProductPage {
  readonly page: Page
  readonly productList: Locator;
  readonly productPrices: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

   constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
    this.productPrices = page.locator('.inventory_item_price');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

 async expectLoaded() {
    await expect(this.productList).toBeVisible();
  }

 //dynamically add a product to the cart by product name
  async addToCart(productName: string) {
    await this.page
      .locator('.inventory_item', { hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  //dynamically remove a product from the cart by product name
  async removeFromCart(productName: string) {
    await this.page
      .locator('.inventory_item', { hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }
  
  //get the price of a product by product name
   async getProductPrice(productName: string) {
    return await this.page
      .locator('.inventory_item', { hasText: productName })
      .locator('.inventory_item_price')
      .innerText();
  }

   async expectCartCount(count: number) {
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

    async openCart() {
    await this.shoppingCartLink.click();
  }
}