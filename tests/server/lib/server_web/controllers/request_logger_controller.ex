defmodule ServerWeb.RequestLoggerController do
    use ServerWeb, :controller

    action_fallback ServerWeb.FallbackController

    def index(conn, _params) do
        json(conn, RequestLogger.get())
    end
end