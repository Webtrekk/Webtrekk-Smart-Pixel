defmodule ServerWeb.UserController do
    use ServerWeb, :controller

    def register(conn, params) do
        newUser(conn, params)
    end

    defp newUser(conn, data = %{"name" => name, "password" => password}) do
        case PseudoDb.User.newUser(data) do
            :exists -> ServerWeb.Authenticator.sendUnauthorizedResponse(conn, "User exists already")
            :ok -> verifyLogin(ServerWeb.Authenticator.authenticateLogin(conn, name, password))
        end
    end
    defp newUser(conn,_), do: ServerWeb.Authenticator.sendUnauthorizedResponse(conn, "No username / password")

    def login(conn, %{"name" => name, "password" => password}) do
        verifyLogin(ServerWeb.Authenticator.authenticateLogin(conn, name, password))
    end
    def login(conn, _), do: ServerWeb.Authenticator.sendUnauthorizedResponse(conn, "No username / password")

    def verifyLogin(%{conn: conn, status: :invalid}), do: ServerWeb.Authenticator.sendUnauthorizedResponse(conn, "Invalid")
    def verifyLogin(%{conn: conn, credentials: credentials}), do: json(conn, credentials)

end