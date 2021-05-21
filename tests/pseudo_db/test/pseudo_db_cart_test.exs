defmodule PseudoDbCartTest do
  use ExUnit.Case
  alias PseudoDb.Cart

  test "create new cart" do
    cartKey = Cart.newCart()
    assert is_binary(cartKey)

    cartContent = Cart.getCart(cartKey)
    assert cartContent == []
  end

  test "cart doesnt exist" do
    assert Cart.getCart('does_not_exist ') == []
  end

  test "update cart without quantity" do
    cartKey = Cart.newCart()
    Cart.updateCart(cartKey, %{"id" => "a"})

    cartContent = Cart.getCart(cartKey)
    assert cartContent == [%{"id" => "a", "quantity" => 1}]
  end

  test "make cart empty" do
    cartKey = Cart.newCart()
    Cart.updateCart(cartKey, %{"id" => "a"})

    cartContent = Cart.getCart(cartKey)
    assert cartContent == [%{"id" => "a", "quantity" => 1}]

    Cart.emptyCart(cartKey)
    cartContent = Cart.getCart(cartKey)
    assert cartContent == []
  end

  test "add without id" do
    cartKey = Cart.newCart()
    assert Cart.updateCart(cartKey, %{"foo" => "a"}) == :no_id
  end

  test "update existint cart item" do
    cartKey = Cart.newCart()
    assert Cart.updateCart(cartKey, %{"id" => "a"}) == :ok
    assert Cart.updateCart(cartKey, %{"id" => "b"}) == :ok

    assert Cart.updateCart(cartKey, %{"id" => "a"}) == :ok

    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "b", "quantity" => 1},
             %{"id" => "a", "quantity" => 2}
           ]
  end

  test "update existing cart item with explicit quantity" do
    cartKey = Cart.newCart()
    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => 22}) == :ok
    assert Cart.updateCart(cartKey, %{"id" => "b", "quantity" => 11}) == :ok

    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => 55}) == :ok

    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "b", "quantity" => 11},
             %{"id" => "a", "quantity" => 77}
           ]
  end

  test "update existing cart item with explicit quantity as strings" do
    cartKey = Cart.newCart()
    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "22"}) == :ok
    assert Cart.updateCart(cartKey, %{"id" => "b", "quantity" => "11"}) == :ok

    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "55"}) == :ok

    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "b", "quantity" => 11},
             %{"id" => "a", "quantity" => 77}
           ]
  end

  test "remove cart item with explicit quantity" do
    cartKey = Cart.newCart()
    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "22"}) == :ok
    assert Cart.updateCart(cartKey, %{"id" => "b", "quantity" => "11"}) == :ok

    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "55"}) == :ok

    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "b", "quantity" => 11},
             %{"id" => "a", "quantity" => 77}
           ]

    assert Cart.removeItemFromCart(cartKey, "a", 11) == :ok
    assert Cart.removeItemFromCart(cartKey, "b", 11) == :ok
    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "a", "quantity" => 66}
           ]
  end

  test "remove cart item with explicit quantity with strings" do
    cartKey = Cart.newCart()
    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "22"}) == :ok
    assert Cart.updateCart(cartKey, %{"id" => "b", "quantity" => "11"}) == :ok

    assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "55"}) == :ok

    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "b", "quantity" => 11},
             %{"id" => "a", "quantity" => 77}
           ]

    assert Cart.removeItemFromCart(cartKey, "a", "11") == :ok
    assert Cart.removeItemFromCart(cartKey, "b", "11") == :ok
    cartContent = Cart.getCart(cartKey)

    assert cartContent == [
             %{"id" => "a", "quantity" => 66}
           ]
  end

  test "remove cart item wrong id fails" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "22"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "b", "quantity" => "11"}) == :ok

      assert Cart.updateCart(cartKey, %{"id" => "a", "quantity" => "55"}) == :ok

      cartContent = Cart.getCart(cartKey)

      assert cartContent == [
                 %{"id" => "b", "quantity" => 11},
                 %{"id" => "a", "quantity" => 77}
             ]

      assert Cart.removeItemFromCart(cartKey, "c", "11") == :not_found
      cartContent = Cart.getCart(cartKey)

      assert cartContent == [
                 %{"id" => "b", "quantity" => 11},
                 %{"id" => "a", "quantity" => 77}
             ]
  end

  test "calculate prices" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "pricetest", "quantity" => "22", "price" => "12.9"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "pricetest2", "quantity" => "11", "price" => "25"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "pricetest3", "quantity" => "19" }) == :ok
      cartContent = Cart.getCart(cartKey)
      assert cartContent == [
                 %{"id" => "pricetest3", "quantity" => 19},
                 %{"id" => "pricetest2", "quantity" => 11, "sum" => 275.0, "price" => 25},
                 %{"id" => "pricetest", "quantity" => 22, "sum" => 283.8, "price" => 12.9},
             ]
  end

  test "delete wrong price values" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "pricetest", "quantity" => "22", "price" => "abc"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "pricetest2", "quantity" => "11", "price" => "def"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "pricetest3", "quantity" => "19" }) == :ok
      cartContent = Cart.getCart(cartKey)
      assert cartContent == [
                 %{"id" => "pricetest3", "quantity" => 19},
                 %{"id" => "pricetest2", "quantity" => 11},
                 %{"id" => "pricetest", "quantity" => 22}
             ]
  end
  test "round floats" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "pricetest", "quantity" => "22", "price" => 17.776577}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "pricetest2", "quantity" => "11", "price" => 12.5477}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "pricetest3", "quantity" => "19" }) == :ok
      cartContent = Cart.getCart(cartKey)
      assert cartContent == [
                 %{"id" => "pricetest3", "quantity" => 19},
                 %{"id" => "pricetest2", "quantity" => 11, "price" => 12.5477, "sum" => 138.02},
                 %{"id" => "pricetest", "quantity" => 22, "price" => 17.776577, "sum" => 391.08}
             ]
  end

  test "float calculation after adding the same item x times" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      cartContent = Cart.getCart(cartKey)
      assert cartContent == [%{"id" => "2", "quantity" => 8, "price" => 22.1, "sum" => 176.8}]
  end

  test "have sum for 1st add" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "3", "price" => "22.1"}) == :ok

      cartContent = Cart.getCart(cartKey)
      assert cartContent == [%{"id" => "3", "price" => 22.1, "sum" => 22.1, "quantity" => 1}, %{"id" => "2", "quantity" => 1, "price" => 22.1, "sum" => 22.1}]
  end

  test "calculate sum after removing an item" do
      cartKey = Cart.newCart()
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok
      assert Cart.updateCart(cartKey, %{"id" => "2", "price" => "22.1"}) == :ok

      cartContent = Cart.getCart(cartKey)
      assert cartContent == [ %{"id" => "2", "quantity" => 2, "price" => 22.1, "sum" => 44.2}]
      assert Cart.removeItemFromCart(cartKey, "2", "1") == :ok
      cartContent = Cart.getCart(cartKey)
      assert cartContent == [ %{"id" => "2", "quantity" => 1, "price" => 22.1, "sum" => 22.1}]
  end

end
