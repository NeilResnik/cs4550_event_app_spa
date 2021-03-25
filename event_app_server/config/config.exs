# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :event_app_server,
  ecto_repos: [EventAppServer.Repo]

# Configures the endpoint
config :event_app_server, EventAppServerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "p+fqqd9h7thYcJdeLOzdXBZyv4fyNuLD6+/Gq2TSgNy/aSZgjaMjSHdtGxsiCR1K",
  render_errors: [view: EventAppServerWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: EventAppServer.PubSub,
  live_view: [signing_salt: "H8sV+6Kn"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
