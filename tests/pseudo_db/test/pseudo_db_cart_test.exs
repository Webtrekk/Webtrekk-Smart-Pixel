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
end
