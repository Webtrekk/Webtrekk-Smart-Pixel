defmodule Server.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :age, :integer
    field :first, :string
    field :gender, :string
    field :last, :string
    field :password, :string
    field :role, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first, :last, :password, :age, :gender, :role])
    |> validate_required([:first, :last, :password, :age, :gender, :role])
  end
end
