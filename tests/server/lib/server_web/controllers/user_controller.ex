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
        json(conn, PseudoDb.User.addOrder(conn.assigns[:mapp_e2e_token], order ))
    end

    def getUserData(conn, _) do
        token = fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_token"])
        json(conn, PseudoDb.User.getDataByToken(token))
    end

    def logout(conn, _) do
        conn |> delete_resp_cookie("mapp_e2e_token", same_site: "None") |> json(%{message: "logged out"})
    end

    def orderCart(conn, data) do
        cart = fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_cart"])
        cartContent = PseudoDb.Cart.getCart(cart)
        orderContent = Map.put(data, "products", cartContent)
        sums = for _cartEntry = %{"sum" => sum} <- cartContent, do: sum
        orderValue = sums
                     |> Enum.map(&trunc(&1 * 100))
                     |> Enum.sum()
                     |> Kernel./(100)
        orderContent = Map.put(orderContent, "orderValue", orderValue )
        response = PseudoDb.User.addOrder(conn.assigns[:mapp_e2e_token], orderContent )
        PseudoDb.Cart.emptyCart(cart)
        json(conn, response)
    end

end