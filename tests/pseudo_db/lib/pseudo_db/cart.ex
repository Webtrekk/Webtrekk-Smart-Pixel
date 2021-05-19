defmodule PseudoDb.Cart do
  @me __MODULE__

  def start_link() do
    Agent.start_link(
      fn -> %{} end,
      name: @me
    )
  end

  def getAllCarts() do
    Agent.get(@me, & &1)
  end

  def getCartItems(key) do
    Agent.get(@me, & &1[key])
  end

  def newCart() do
    key = :crypto.strong_rand_bytes(30) |> Base.url_encode64()
    Agent.update(@me, fn data -> Map.put(data, key, []) end)
    key
  end

  def getCart(), do: newCart()

  def getCart(key) do
    case checkIfCartExists(key) do
      true -> getCartItems(key)
      false ->
        Agent.update(@me, fn carts -> Map.put(carts, key, []) end)
        getCart(key)
    end
  end

  def checkIfCartExists(key) do
    Agent.get(@me, fn carts ->
      Map.has_key?(carts, key)
    end)
  end

  def updateCart(key, data = %{"id" => _id, "quantity" => q}) when is_binary(q) do
    case Integer.parse(q) do
      :error -> updateCart(key, Map.put(data, "quantity", 1))
      {number, _rest} -> updateCart(key, Map.put(data, "quantity", number))
    end
  end

  def updateCart(key, data = %{"id" => id, "quantity" => q}) when is_number(q) do
    updateCartItem(key, data, Enum.any?(getCart(key), &(&1["id"] == id)))
    :ok
  end

  def updateCart(key, data = %{"id" => _id}), do: updateCart(key, Map.put(data, "quantity", 1))
  def updateCart(_key, _data), do: :no_id

  def updateCartItem(key, data, _updateExistingEntry = true) do
    existingCartItems = getCart(key)
    existingItem = Enum.find(existingCartItems, &(&1["id"] == data["id"]))

    newItems =
      put_in(
        existingCartItems,
        [Access.filter(&(&1["id"] == data["id"])), Access.key("quantity")],
        data["quantity"] + existingItem["quantity"]
      )

    Agent.update(@me, &Map.put(&1, key, newItems))
    :ok
  end

  def updateCartItem(key, data, _updateExistingEntry = false) do
    Agent.update(@me, fn carts -> Map.put(carts, key, [data | carts[key]]) end)
  end

  def emptyCart(key) do
    Agent.update(@me, fn carts -> Map.put(carts, key, []) end)
  end

  def removeItemFromCart(key, id), do: removeItemFromCart(key, id, 1)

  def removeItemFromCart(key, id, amount) when is_binary(amount) do
    case Integer.parse(amount) do
      :error -> removeItemFromCart(key, id, 1)
      {number, _rest} -> removeItemFromCart(key, id, number)
    end
  end

  def removeItemFromCart(key, id, amount) when is_number(amount) do
    existingCartItems = getCart(key)

    case Enum.find(existingCartItems, &(&1["id"] == id)) do
      nil ->
        :not_found

      existingItem ->
        if existingItem["quantity"] - amount <= 0 do
          Agent.update(@me, fn carts ->
            Map.put(carts, key, List.delete(existingCartItems, existingItem))
          end)

          :ok
        else
          newItems =
            put_in(
              existingCartItems,
              [Access.filter(&(&1["id"] == id)), Access.key("quantity")],
              existingItem["quantity"] - amount
            )

          Agent.update(@me, &Map.put(&1, key, newItems))
          :ok
        end
    end
  end
end
