defmodule PseudoDb.Order do
  @me __MODULE__

  alias PseudoDb.Order

  def start_link() do
    Agent.start_link(
      fn ->
        [
          %{
            "product_name" => "T-Shirt",
            "amount" => 5
          }
        ]
      end,
      name: @me
    )
  end

  def getAllOrders() do
    Agent.get(
      @me,
      fn a ->
        Enum.with_index(a) |> Enum.map(fn {data, index} -> Map.put(data, "id", index) end)
      end
    )
  end

  def addOrder(order) do
    Agent.update(
      @me,
      fn orders -> orders ++ [order] end
    )

    %{orderId: Agent.get(@me, &(length(&1) - 1)), data: order}
  end

  def getOrdersByIds(ids) do
    Agent.get(@me, fn orders ->
      Enum.with_index(orders)
      |> Enum.map(fn {data, index} -> Map.put(data, "orderId", index) end)
      |> Enum.filter(fn order -> order["orderId"] in ids end)
    end)
  end
end
