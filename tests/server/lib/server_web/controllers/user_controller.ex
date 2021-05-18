defmodule ServerWeb.UserController do
    use ServerWeb, :controller
    alias ServerWeb.Authenticator

    def register(conn, data = %{"name" => name, "password" => password}) do
        case PseudoDb.User.newUser(Map.put(data, "orders", [])) do
            :exists -> Authenticator.sendUnauthorizedResponse(conn, "User exists already")
            :ok -> verifyLogin(Authenticator.authenticateLogin(conn, name, password))
        end
    end
    def register(conn,_), do: Authenticator.sendUnauthorizedResponse(conn, "No username / password")

    def login(conn, %{"name" => name, "password" => password}) do
        verifyLogin(Authenticator.authenticateLogin(conn, name, password))
    end
    def login(conn, _), do: Authenticator.sendUnauthorizedResponse(conn, "No username / password")

    def verifyLogin(%{conn: conn, status: :invalid}), do: Authenticator.sendUnauthorizedResponse(conn, "Invalid")
    def verifyLogin(%{conn: conn, credentials: credentials}), do: json(conn, credentials)

    def add_order(conn, order) do
        json(conn, %{orderId: PseudoDb.User.addOrder(conn.assigns[:mapp_e2e_token], order )})
    end

end