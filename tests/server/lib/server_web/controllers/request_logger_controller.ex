defmodule ServerWeb.RequestLoggerController do
  use ServerWeb, :controller

  action_fallback ServerWeb.FallbackController

  def index(conn, %{"action" => "delete"}) do
    RequestLogger.reset()
    ServerWeb.Endpoint.broadcast!("requests:lobby", "delete_request", [])
    json(conn, [])
  end

  def index(conn, _params) do
    json(conn, RequestLogger.get())
  end
end
