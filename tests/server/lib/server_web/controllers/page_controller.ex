defmodule ServerWeb.PageController do
  use ServerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def requests(conn, _params) do
    render(conn, "requests.html", RequestLogger.getApp())
  end
end
