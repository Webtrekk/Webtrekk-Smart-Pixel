defmodule RequestLogger.App do
    @me __MODULE__

    def start_link() do
        Agent.start_link(fn -> %{js: getJS(), css: getCSS()}  end, name: @me)
    end
    def getApp() do
        Agent.get(@me, & &1)
    end
    defp getJS() do
        "../../requestLogFrontend/public/build/bundle.js"
        |> Path.expand(__DIR__)
        |> File.read!
    end
    defp getCSS() do
        "../../requestLogFrontend/public/build/bundle.css"
        |> Path.expand(__DIR__)
        |> File.read!
    end
end