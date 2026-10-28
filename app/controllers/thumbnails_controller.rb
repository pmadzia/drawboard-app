class ThumbnailsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :reject_missing
  rescue_from ActiveRecord::RecordInvalid, with: :reject_upload

  def show
    thumbnail = find_board.fetch_thumbnail
    send_data thumbnail, type: "image/jpeg", disposition: "inline"
  end

  def update
    find_board.update!(thumbnail: params.require(:image).read)
    head :no_content
  end

  private

  def find_board
    Board.find_by!(slug: params[:board_id])
  end

  def reject_missing
    head :not_found
  end

  def reject_upload
    head :unprocessable_entity
  end
end
