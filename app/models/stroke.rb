class Stroke < ApplicationRecord
  belongs_to :board

  validates :uid, presence: true, uniqueness: { scope: :board_id }
  validates :data, presence: true

  after_create_commit :announce_creation
  after_destroy_commit :announce_removal

  private

  def announce_creation
    announce("added")
  end

  def announce_removal
    announce("removed")
  end

  def announce(type)
    BoardChannel.broadcast_to(board, { type: type, uid: uid })
  end
end
