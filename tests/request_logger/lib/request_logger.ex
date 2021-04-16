defmodule RequestLogger do

    alias RequestLogger.Log
    defdelegate add(request), to: Log
    defdelegate get(), to: Log
    defdelegate reset(), to: Log

end
