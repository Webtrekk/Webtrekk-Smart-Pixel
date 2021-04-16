defmodule RequestLogger.Log do
    @me __MODULE__

    alias RequestLogger.Log

    def start_link() do
        Agent.start_link(fn -> []  end, name: @me)
    end

    def add(request) do
        Agent.update(@me, fn state ->  Log.update(request, state) end )
    end

    def get() do
        Agent.get(@me, & &1)
    end

    def update(request, state), do: [request | state ]

    def reset() do
        Agent.update(@me, fn _state -> [] end)
    end

end