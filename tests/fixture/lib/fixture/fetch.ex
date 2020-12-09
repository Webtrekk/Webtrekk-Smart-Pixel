defmodule Fixture.Fetch do
  @me __MODULE__

  alias Fixture.Fetch

  def start_link() do
    Agent.start_link(&json_files/0, name: @me)
  end

  def data() do
    Agent.get(@me, & &1)
  end

  def data(key) do
    Agent.get(@me, fn data ->
      Map.fetch(data, key)
      |> Fetch.handle_result()
    end)
  end

  def data(key, index) do
    Fetch.index_value(Fetch.data(key), index)
  end

  def data(key, prop, value) do
      Fetch.filter(Fetch.data(key), prop, value)
  end

  def filter(data, prop, value) when is_list(data) do
      Enum.filter(data, fn entry -> entry[prop] == value end)
  end
  def filter(_,_,_), do: nil

  def index_value(data, index) when is_list(data),
    do: Fetch.parse_index_value(Enum.fetch(data, index))

  def index_value(_), do: nil

  def parse_index_value({:ok, product}), do: product
  def parse_index_value(_), do: nil

  def json_data(path) do
    path
    |> Path.expand(__DIR__)
    |> File.read!()
    |> Jason.decode!()
    |> name(path)
  end

  defp name(data, path) do
    [key] = Regex.run(~r{[^\/]*(?=\.json$)}, path)
    Map.put(%{}, key, data)
  end

  defp json_files() do
    "../../assets/*.json"
    |> Path.expand(__DIR__)
    |> Path.wildcard()
    |> Enum.map(&Fetch.json_data/1)
    |> Enum.reduce(fn x, acc ->
      Map.merge(x, acc, fn _key, map1, map2 ->
        for {k, v1} <- map1, into: %{}, do: {k, v1 + map2[k]}
      end)
    end)
  end

  def handle_result({:ok, result}), do: result
  def handle_result(:error), do: :error
end
