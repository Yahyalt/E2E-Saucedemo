import { test } from "../../fixtures/pages.fixture";
import { validUser } from "../../test-data/users";

test("checkout journey", async ({ loginPage, productPage }) => {
  await test.step("User login", async () => {
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.expectLoggedIn();
  });

  await test.step("Add product to cart", async () => {
    await productPage.expectLoaded();
    await productPage.addToCart("Sauce Labs Backpack");
    await productPage.expectCartCount(1);
  });

  // next steps go here: product, checkout form, payment, confirmation
});                      
