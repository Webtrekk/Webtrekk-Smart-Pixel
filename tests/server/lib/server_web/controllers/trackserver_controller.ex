defmodule ServerWeb.TrackServerController do
  use ServerWeb, :controller

  action_fallback ServerWeb.FallbackController

  def index(conn, params) do
    RequestLogger.add(params)
    ServerWeb.Endpoint.broadcast!("requests:lobby", "new_request", params)

    gif_data =
      <<71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 0, 0, 0, 255, 255, 255, 33, 249, 4, 1, 0,
        0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 1, 68, 0, 59>>

    conn = put_resp_content_type(conn, "image/gif")
    send_resp(conn, 200, gif_data)
  end
end
