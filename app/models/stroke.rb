class Stroke < ApplicationRecord
  belongs_to :board

  validates :uid, presence: true, uniqueness: { scope: :board_id }
  validates :data, presence: true

  after_create_commit :announce_creation

  private

  def announce_creation
    BoardChannel.broadcast_to(board, { type: "added", uid: uid })
  end
end
