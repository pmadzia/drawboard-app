class StrokesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_rejection

  def index
    render json: find_board.strokes.order(:id).pluck(:data)
  end

  def create
    find_board.strokes.create!(uid: params.require(:uid), data: extract_data)
    head :created
  end

  def show
    render json: find_board.strokes.find_by!(uid: params[:id]).data
  end

  private

  def find_board
    Board.find_by!(slug: params[:board_id])
  end

  def extract_data
    params.require(:data).permit!.to_h
  end

  def render_rejection(error)
    render json: { error: error.message }, status: :unprocessable_entity
  end
end
