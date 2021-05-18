defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :image do
    plug CORSPlug, origin: ~r/.*/
  end

  pipeline :with_session do
      plug :fetch_session
      plug ServerWeb.Authenticator
  end

  pipeline :api do
    plug CORSPlug, origin: ~r/.*/
    plug :accepts, ["json"]
  end

  pipeline :static do
    plug Plug.Static,
      at: "/apps",
      from: {:server, "priv/apps"},
      gzip: false,
      only:
        ~w(vue3 vue react angular requests index.html manifest.json service-worker.js css fonts img js favicon.ico robots.txt),
      only_matching: ["precache-manifest"]
  end

  scope "/", ServerWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/requests", PageController, :requests
  end

  scope "/api", ServerWeb do
    pipe_through :api
    get "/fixture/", FixtureController, :index
    get "/fixture/:key", FixtureController, :show
    get "/fixture/:key/:index", FixtureController, :show
    get "/fixture/:key/:prop/:value", FixtureController, :show
  end

  scope "/user", ServerWeb do
      pipe_through :api
      post "/register", UserController, :register
      post "/login", UserController, :login
      get "/login", UserController, :login
  end

  scope "/order", ServerWeb do
      pipe_through [:api, :with_session]
      get "/new", UserController, :add_order
      post "/new", UserController, :add_order
  end

  scope "/123123123123123/wt", ServerWeb do
    pipe_through :image
    get "/", TrackServerController, :index
  end

  scope "/requests", ServerWeb do
    pipe_through :api
    get "/json/", RequestLoggerController, :index
  end

  scope "/apps", ServerWeb do
    pipe_through :static
    get "/:app/*path", AppController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", ServerWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test, :docker] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: ServerWeb.Telemetry
    end
  end
end
