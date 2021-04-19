defmodule RequestLogger do

    alias RequestLogger.{Log, App}
    defdelegate add(request), to: Log
    defdelegate get(), to: Log
    defdelegate reset(), to: Log

    defdelegate getApp(), to: App

end
