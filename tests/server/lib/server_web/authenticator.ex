defmodule ServerWeb.Authenticator do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    case fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_token"]) do
      nil ->
        sendUnauthorizedResponse(conn, "Unauthorized")
      token ->
        authenticateToken(conn, PseudoDb.User.verifyToken(token))
    end
  end

  def authenticateToken(conn, :invalid) do
    sendUnauthorizedResponse(conn, "Unauthorized")
  end

  def authenticateToken(conn, token) do
      conn
      |> assign(:mapp_e2e_token, token)
  end

  def sendUnauthorizedResponse(conn, message) do
    conn
    |> Plug.Conn.put_resp_content_type("application/json")
    |> Plug.Conn.send_resp(401, ~s[{"message": "#{message}"}])
    |> halt()
  end

  def authenticateLogin(conn, name, password) do
      case PseudoDb.User.verifyPassword(name, password) do
          :invalid -> %{conn: conn, status: :invalid}
          _credentials = %{token: token} -> setCookie(conn, token)
      end
  end

  defp setCookie(conn, token) do
      conn = conn |> put_resp_cookie("mapp_e2e_token", token, [same_site: "None", secure: true] )
      %{conn: conn, credentials: %{token: token}}
  end
end
