class BoardChannel < ApplicationCable::Channel
  def subscribed
    stream_for Board.find_by!(slug: params[:slug])
  end
end
