defmodule RequestLogger.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
        %{
            id: RequestLogger.Log,
            start: {RequestLogger.Log, :start_link, []}
        },
        %{
            id: RequestLogger.App,
            start: {RequestLogger.App, :start_link, []}
        },
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RequestLogger.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
