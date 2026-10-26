class BoardsController < ApplicationController
  layout "board", only: :show

  def index
    @boards = Board.order(created_at: :desc)
  end

  def create
    board = Board.create(name: params.require(:name), creator: fetch_name)
    redirect_to board
  end

  def show
    @board = Board.find_by!(slug: params[:id])
  end
end
