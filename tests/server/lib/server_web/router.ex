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
    plug CORSPlug, origin: "*"
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
      gzip: true
      # only:
      #   ~w(vue3 vue2 react angular14 requests index.html manifest.json service-worker.js css fonts img js favicon.ico robots.txt),
      # only_matching: ["precache-manifest"]
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
    options "/fixture/", FixtureController, :index
    options "/fixture/:key", FixtureController, :show
    options "/fixture/:key/:index", FixtureController, :show
    options "/fixture/:key/:prop/:value", FixtureController, :show
  end

  scope "/user", ServerWeb do
      pipe_through :api
      post "/register", UserController, :register
      get "/register", UserController, :register
      options "/register", UserController, :register
      post "/login", UserController, :login
      get "/login", UserController, :login
      options "/login", UserController, :login
      get "/check", UserController, :checkLoginStatus
      options "/check", UserController, :checkLoginStatus
  end

  scope "/user", ServerWeb do
      pipe_through [:api, :with_session]
      get "/", UserController, :getUserData
      options "/", UserController, :getUserData
      get "/logout", UserController, :logout
      options "/logout", UserController, :logout
  end

  scope "/order", ServerWeb do
      pipe_through [:api, :with_session]
      get "/new", UserController, :add_order
      post "/new", UserController, :add_order
      options "/new", UserController, :add_order
  end

  scope "/cart", ServerWeb do
      pipe_through [:api]
      get "/", CartController, :getCart
      options "/", CartController, :getCart
      get "/add", CartController, :addToCart
      post "/add", CartController, :addToCart
      options "/add", CartController, :addToCart
      post "/delete", CartController, :delete
      options "/delete", CartController, :delete
      get "/delete", CartController, :delete
      get "/id", CartController, :id
      options "/id", CartController, :id
  end

  scope "/cart", ServerWeb do
      pipe_through [:api, :with_session]
      get "/order", UserController, :orderCart
      options "/order", UserController, :orderCart
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

  scope "/packages", ServerWeb do
    pipe_through :static
    get "/*path", PackageController, :index
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
  if Mix.env() in [:dev, :test, :docker, :prod] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ServerWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
