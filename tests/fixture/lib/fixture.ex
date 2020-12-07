defmodule Fixture do

  alias Fixture.Fetch

  defdelegate data(), to: Fetch
  defdelegate data(key), to: Fetch
  defdelegate data(key, index), to: Fetch
end
