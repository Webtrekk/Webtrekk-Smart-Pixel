defmodule Server.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first, :string
      add :last, :string
      add :password, :string
      add :age, :integer
      add :gender, :string
      add :role, :string

      timestamps()
    end

  end
end
