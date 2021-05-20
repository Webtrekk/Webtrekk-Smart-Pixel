defmodule PseudoDb.User do
  @me __MODULE__

  alias PseudoDb.User
  alias PseudoDb.Order

  def start_link() do
    Agent.start_link(
      fn ->
        [
          %{
            "name" => "Mapp",
            "password" => "meh",
            "token" => "1234",
            "orders" => []
          }
        ]
      end,
      name: @me
    )
  end

  def getAll() do
    Agent.get(@me, & &1)
  end

  def getDataByToken(token, key) do
    Agent.get(@me, fn data ->
      case Enum.filter(data, &(&1["token"] == token)) do
        [h | _t] -> User.getValue(Map.fetch(h, key))
        _ -> :unauthenticated
      end
    end)
  end

  def getDataByToken(token) do
      Agent.get(@me, fn data ->
          case Enum.find(data, &(&1["token"] == token)) do
              nil -> :unauthenticated
              userData ->
                  Map.put(userData, "orders", Order.getOrdersByIds(userData["orders"]))
                  |> Map.delete("password")
                  |> Map.delete("token")
          end
      end)
  end

  def getValue({:ok, value}), do: value
  def getValue(:error), do: :no_data

  def verifyToken(token) do
    Agent.get(@me, fn data ->
      case Enum.any?(data, &(&1["token"] == token)) do
        true -> token
        false -> :invalid
      end
    end)
  end

  def verifyPassword(username, password) do
    case checkIfPasswordIsValid(username, password) do
      :invalid -> :invalid
      :valid -> setNewToken(username)
    end
  end

  def checkIfPasswordIsValid(username, password) do
    Agent.get(@me, fn data ->
      case Enum.any?(data, &(&1["name"] == username && &1["password"] == password)) do
        true -> :valid
        false -> :invalid
      end
    end)
  end

  defp setNewToken(name) do
    token = generateToken()
    updateByName(name, "token", token)
    %{token: token}
  end

  # Setting a new token:
  # ServerWeb.User.updateByName("Mapp", "token", "1234")
  def updateByName(name, key, newValue) do
    Agent.update(@me, fn allUsers ->
      put_in(
        allUsers,
        [Access.filter(&(&1["name"] == name)), Access.key(key)],
        newValue
      )
    end)
  end

  def updateByToken(token, key, newValue) do
    Agent.update(@me, fn allUsers ->
      put_in(
        allUsers,
        [Access.filter(&(&1["token"] == token)), Access.key(key)],
        newValue
      )
    end)
  end

  def generateToken(), do: :crypto.strong_rand_bytes(30) |> Base.url_encode64()

  def newUser(data) do
    case checkIfUserExists(data) do
      true -> :exists
      false -> addNewUser(data)
    end
  end

  defp checkIfUserExists(%{"name" => username}) do
    Agent.get(@me, fn data ->
      #            Enum.any?(data, fn d -> d["name"] == username end)
      Enum.any?(data, &(&1["name"] == username))
    end)
  end

  defp addNewUser(data) do
    Agent.update(@me, fn allUsers -> [Map.put(data, "token", generateToken()) | allUsers] end)
    :ok
  end

  def addOrder(token, order) do
    orderData = %{orderId: newOrderId} = PseudoDb.Order.addOrder(order)
    orderIds = [newOrderId] ++ getDataByToken(token, "orders")
    updateByToken(token, "orders", orderIds)
    orderData
  end

end
