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
      data
      |> Fetch.fetch_key(key)
    end)
  end

  def fetch_key(data, key) do
    Map.fetch(data, key)
    |> case do
      {:ok, result} -> result
      :error -> :error
    end
  end

  def data(key, index) do
    Agent.get(@me, fn data ->
      data
      |> Fetch.fetch_key(key)
      |> Fetch.index_value(index)
    end)
  end

  def index_value(data, index) when is_list(data) do
    Enum.fetch(data, Fetch.parse_index(index))
    |> case do
      {:ok, product} -> product
      _ -> nil
    end
  end

  def index_value(_), do: nil

  def parse_index(string) when is_binary(string) do
      case Integer.parse(string) do
          {number, _} -> number
          :error -> 0
      end
  end

  def parse_index(number), do: number

  def data(key, prop, value) do
    Agent.get(@me, fn data ->
      data
      |> Fetch.fetch_key(key)
      |> Fetch.filter(prop, value)
    end)
  end

  def filter(data, prop, value) when is_list(data) do
    Enum.filter(data, fn entry -> Regex.match?(~r/#{entry[prop]}/, value) end)
  end

  def filter(_, _, _), do: nil

  def json_data(path) do
    path
    |> File.read!()
    |> Jason.decode!()
    |> name(path)
  end

  defp name(data, path) do
    [key] = Regex.run(~r{[^\/]*(?=\.json$)}, path)
    Map.put(%{}, key, data)
  end

  defp json_files() do
    "../../../E2E/cypress/fixtures/*.json"
    |> Path.expand(__DIR__)
    |> Path.wildcard()
    |> Enum.map(&Fetch.json_data/1)
    |> Enum.reduce(fn x, acc ->
      Map.merge(x, acc, fn _key, map1, map2 ->
        for {k, v1} <- map1, into: %{}, do: {k, v1 + map2[k]}
      end)
    end)
  end
end
