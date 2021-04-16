defmodule RequestLoggerTest do
  use ExUnit.Case
  doctest RequestLogger

  test "greets the world" do
    assert RequestLogger.hello() == :world
  end
end
