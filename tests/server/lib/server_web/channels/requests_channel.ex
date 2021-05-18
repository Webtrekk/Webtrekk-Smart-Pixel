defmodule ServerWeb.RequestsChannel do
  use Phoenix.Channel

  def join("requests:lobby", _message, socket) do
    #        push(socket, "new_request", %{"id"=>"test"})
    #        send(self(), :after_join)
    {:ok, socket}
  end

  #    def join("requests:" <> _private_room_id, _params, _socket) do
  #        {:error, %{reason: "unauthorized"}}
  #    end
  #    def handle_info(:after_join, socket) do
  #        push(socket, "new_request", RequestLogger.get())
  #        {:noreply, socket}
  #    end
end
