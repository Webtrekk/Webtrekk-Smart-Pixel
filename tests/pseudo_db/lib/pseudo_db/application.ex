defmodule PseudoDb.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Starts a worker by calling: PseudoDb.Worker.start_link(arg)
      # {PseudoDb.Worker, arg}
      %{
        id: PseudoDb.User,
        start: {PseudoDb.User, :start_link, []}
      },
      %{
        id: PseudoDb.Order,
        start: {PseudoDb.Order, :start_link, []}
      },
      %{
        id: PseudoDb.Cart,
        start: {PseudoDb.Cart, :start_link, []}
      }
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PseudoDb.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
