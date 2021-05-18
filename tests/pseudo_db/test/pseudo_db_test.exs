defmodule PseudoDbTest do
  use ExUnit.Case
  doctest PseudoDb

  test "greets the world" do
    assert PseudoDb.hello() == :world
  end
end
