# Mapp Intelligence E2E server

This Phoenix server has the following features / routes to help with E2E tests:

- `/123123123123123/wt` endpoint as Trackserver replacement, will return parameter
- `/api/users` to save and get Users to a Postgres DB
- `/api/fixture` to get fixture data from Cypress fixture directory
- `/apps/[appname]` to host pre-built Vue, React and Angular apps

The app-builds have to be saved to directory `priv/apps/[appname]`.

##Fixture
Will always return an `array`, even if it returns just a single entry.

Get all fixture data
```
http://localhost:4000/api/fixture
```
Get fixure data of a specific file
```
http://localhost:4000/api/fixture/products
```
Get fixure data of a specific file and an index if it is an array
```
http://localhost:4000/api/fixture/products/1
```
Get fixure data of a specific file, and filter for a property
```
http://localhost:4000/api/fixture/products/category/Shoes
http://localhost:4000/api/fixture/products/id/3
http://localhost:4000/api/fixture/page/slug/about
```
You can also set a `timeout` parameter, to simulate slow connections
```
http://localhost:4000/api/fixture/products/category/Shoes?timeout=4000
```

##User

The user schema has these properties:
```elixir
    field :age, :integer
    field :first, :string
    field :gender, :string
    field :last, :string
    field :password, :string
    field :role, :string
```

##Routes:


              user_path  GET     /api/users                      ServerWeb.UserController :index
              user_path  GET     /api/users/:id                  ServerWeb.UserController :show
              user_path  POST    /api/users                      ServerWeb.UserController :create
              user_path  PATCH   /api/users/:id                  ServerWeb.UserController :update
                         PUT     /api/users/:id                  ServerWeb.UserController :update
              user_path  DELETE  /api/users/:id                  ServerWeb.UserController :delete
           fixture_path  GET     /api/fixture                    ServerWeb.FixtureController :index
           fixture_path  GET     /api/fixture/:key               ServerWeb.FixtureController :show
           fixture_path  GET     /api/fixture/:key/:index        ServerWeb.FixtureController :show
           fixture_path  GET     /api/fixture/:key/:prop/:value  ServerWeb.FixtureController :show
      track_server_path  GET     /123123123123123/wt             ServerWeb.TrackServerController :index
              page_path  GET     /apps/:app/*path                ServerWeb.PageController :index
    live_dashboard_path  GET     /dashboard                      Phoenix.LiveView.Plug :home
    live_dashboard_path  GET     /dashboard/:page                Phoenix.LiveView.Plug :page
    live_dashboard_path  GET     /dashboard/:node/:page          Phoenix.LiveView.Plug :page
    


##To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).
