defmodule EventAppServer.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :date
    field :description, :string
    field :name, :string
    belongs_to :user, EventAppServer.Users.User
    has_many :comments, EventAppServer.Comments.Comment
    has_many :invites, EventAppServer.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :date, :description, :user_id])
    |> validate_required([:name, :date, :description, :user_id])
  end
end
