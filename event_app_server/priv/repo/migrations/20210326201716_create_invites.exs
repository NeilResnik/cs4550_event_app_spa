defmodule EventAppServer.Repo.Migrations.CreateInvites do
  use Ecto.Migration

  def change do
    create table(:invites) do
      add :user_email, :string, null: false
      add :status, :string, null: false
      add :event_id, references(:events, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:invites, [:event_id])
  end
end
