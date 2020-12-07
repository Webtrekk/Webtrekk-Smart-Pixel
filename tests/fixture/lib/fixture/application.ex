defmodule Fixture.Application do
  use Application

  def start(_type, _args) do
    children = [
      %{
        id: Fixture.Fetch,
        start: {Fixture.Fetch, :start_link, []}
      }
    ]

    options = [
      name: Fixture.Supervisor,
      strategy: :one_for_one
    ]

    Supervisor.start_link(children, options)
  end
end
