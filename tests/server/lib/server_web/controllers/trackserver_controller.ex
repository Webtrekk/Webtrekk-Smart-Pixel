defmodule ServerWeb.TrackServerController do
    use ServerWeb, :controller

    action_fallback ServerWeb.FallbackController

    def index(conn, params) do
        json(conn, params)
    end


end