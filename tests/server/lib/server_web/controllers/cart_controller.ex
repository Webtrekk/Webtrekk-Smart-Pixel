defmodule ServerWeb.CartController do
    use ServerWeb, :controller
    import Plug.Conn
    alias PseudoDb.Cart

    def getCart(conn, _params) do
        case fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_cart"]) do
            nil ->
                createNewCart(conn) |> renderCart()
            key ->
                getCartFromDb(conn, key) |> renderCart()
        end
    end

    def createNewCart(conn) do
        key = Cart.newCart()
        conn = setCookie(conn, key)
        %{conn: conn, data: []}
    end


    def getCartFromDb(conn, key) do
        case Cart.getCart(key) do
            :nocart -> createNewCart(conn)
            data -> %{conn: conn, data: data}
            end
    end

    def addToCart(conn, data = %{"id" => _id}) do
        case fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_cart"]) do
            nil ->
                updateNewCart(conn, data) |> renderCart()
            key ->
                updateExistingCart(conn, key, data) |> renderCart()
        end
    end
    def addToCart(conn, _data) do
        conn
        |> Plug.Conn.put_resp_content_type("application/json")
        |> Plug.Conn.send_resp(401, ~s[{"message": "No id - every cart item needs an id key"}])
        |> halt()
    end

    def updateNewCart(conn, data) do
        key = Cart.newCart()
        conn = setCookie(conn, key)
        updateExistingCart(conn, key, data)
    end

    def updateExistingCart(conn, key, data) do
        Cart.updateCart(key, data)
        %{conn: conn, data: Cart.getCart(key)}
    end

    def renderCart(%{conn: conn, data: data}) do
        json(conn, data)
    end

    def delete(conn, _data = %{"id" => id, "quantity" => quantity}), do: deleteFromCart(conn, id, quantity)
    def delete(conn, _data = %{"id" => id}), do: deleteFromCart(conn, id, 1)

    def deleteFromCart(conn, id, quantity) do
        case Cart.removeItemFromCart(fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_cart"]), id, quantity) do
            :not_found -> conn
                          |> Plug.Conn.put_resp_content_type("application/json")
                          |> Plug.Conn.send_resp(401, ~s[{"message": "ID not found, nothing removed from cart"}])
                          |> halt()
            :ok -> getCart(conn, [])
        end
    end

    def id(conn, %{"id" => id}) do
        conn = setCookie(conn, id)
        getCartFromDb(conn, id) |> renderCart()
    end

    def id(conn, _params) do
        case fetch_cookies(conn) |> Map.from_struct() |> get_in([:cookies, "mapp_e2e_cart"]) do
            nil ->
                json(conn, "")
            key ->
                json(conn, key)
        end
    end

    defp setCookie(conn, key) do
        conn |> put_resp_cookie("mapp_e2e_cart", key, [max_age: 6 * 7 * 24 * 60 * 60, same_site: "None", secure: true]  )
    end

end