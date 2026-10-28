class AddThumbnailToBoards < ActiveRecord::Migration[8.1]
  def change
    add_column :boards, :thumbnail, :binary
  end
end
