defmodule EventAppServer.Repo do
  use Ecto.Repo,
    otp_app: :event_app_server,
    adapter: Ecto.Adapters.Postgres
end
