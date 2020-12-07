# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :server,
  ecto_repos: [Server.Repo]

# Configures the endpoint
config :server, ServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Icxz2hzu8zSBVS1zSk/XOOgWnpr57I6WTonZJ/sDwPJ8/5bKN6k1+Fc1E4n5wkU3",
  render_errors: [view: ServerWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Server.PubSub,
  live_view: [signing_salt: "Pv2SeuMy"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
