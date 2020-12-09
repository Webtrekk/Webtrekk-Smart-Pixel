defmodule ServerWeb.FixtureController do
    use ServerWeb, :controller

    action_fallback ServerWeb.FallbackController

    def index(conn, _params) do
        data = Fixture.data()
        json(conn, data)
    end

    def show(conn, %{"key" => key, "prop" => prop, "value" => value}) do
        json(conn, Fixture.data(key, prop, value))
    end

    def show(conn, %{"key" => key, "index" => index}) do
        json(conn, Fixture.data(key, index))
    end

    def show(conn, %{"key" => key}) do
        json(conn, Fixture.data(key))
    end

end
