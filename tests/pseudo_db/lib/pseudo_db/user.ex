defmodule PseudoDb.User do
    @me __MODULE__

    alias PseudoDb.User

    def start_link() do
        Agent.start_link(
            fn ->
                [
                    %{
                        name: "Mapp",
                        password: "meh",
                        token: "1234",
                        orders: []
                    }
                ]
            end,
            name: @me
        )
    end

    def getAll() do
        Agent.get(@me, & &1)
    end

    def getDataByToken(token, key) do
        Agent.get(@me, fn data ->
            r =
                data
                |> Enum.filter(fn e ->
                    token == e.token
                end)

            case r do
                [h | _t] -> User.getValue(Map.fetch(h, key))
                _ -> :unauthenticated
            end
        end)
    end

    def getValue({:ok, value}), do: value
    def getValue(:error), do: :no_data

    def verifyToken(token) do
        Agent.get(@me, fn data ->
            r =
                data
                |> Enum.filter(fn e ->
                    token == e.token
                end)

            case r do
                [_h | _t] -> token
                _ -> :invalid
            end
        end)
    end

    def verifyPassword(username, password) do
        case checkIfPasswordIsValid(username, password) do
            :invalid -> :invalid
            :valid -> setNewToken(username)
        end
    end

    def checkIfPasswordIsValid(username, password) do
        Agent.get(@me, fn data ->
            r =
                data
                |> Enum.filter(fn e ->
                    username == e.name && password == e.password
                end)

            case r do
                [_h | _t] -> :valid
                _ -> :invalid
            end
        end)
    end

    defp setNewToken(name) do
        token = generateToken()
        updateByName(name, :token, token)
        %{token: token}
    end

    # Setting a new token:
    # ServerWeb.User.updateByName("Mapp Sheep", :token, "1234")
    def updateByName(name, key, newValue) do
        Agent.update(@me, fn allUsers ->
            put_in(
                allUsers,
                [Access.filter(&(&1.name == name)), Access.key(key)],
                newValue
            )
        end)
    end

    def updateByToken(token, key, newValue) do
        Agent.update(@me, fn allUsers ->
            put_in(
                allUsers,
                [Access.filter(&(&1.token == token)), Access.key(key)],
                newValue
            )
        end)
    end

    def generateToken(), do: :crypto.strong_rand_bytes(30) |> Base.url_encode64

    def newUser(data) do
#       Never do this in production: user input (keys) to atom
        data = for {key, val} <- data, into: %{}, do: {String.to_atom(key), val}
        case checkIfUserExists(data) do
            true -> :exists
            false -> addNewUser(data)
        end
    end

    defp checkIfUserExists(%{name: username}) do
        Agent.get(@me, fn data ->
            r =
                data
                |> Enum.filter(fn e ->
                    username == e.name
                end)

            case r do
                [_h | _t] -> true
                _ -> false
            end
        end)
    end

    defp addNewUser(data) do
        Agent.update(@me, fn allUsers -> [ Map.put(data, :token, generateToken()) | allUsers ] end)
        :ok
    end
end
