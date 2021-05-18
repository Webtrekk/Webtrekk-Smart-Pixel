defmodule ServerWeb.FixtureController do
  use ServerWeb, :controller

  action_fallback ServerWeb.FallbackController

  def index(conn, params) do
    timeout(params)
    json(conn, Fixture.data())
  end

  def show(conn, %{"key" => key, "prop" => prop, "value" => value} = params) do
    timeout(params)
    json(conn, Fixture.data(key, prop, value))
  end

  def show(conn, %{"key" => key, "index" => index} = params) do
    timeout(params)
    json(conn, Fixture.data(key, index))
  end

  def show(conn, %{"key" => key} = params) do
    timeout(params)
    json(conn, Fixture.data(key))
  end

  defp timeout(%{"timeout" => timeout}) do
    case Integer.parse(timeout) do
      {number, _} -> number
      :error -> 0
    end
    |> Process.sleep()
  end

  defp timeout(_), do: nil
end
