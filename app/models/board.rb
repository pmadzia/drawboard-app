class Board < ApplicationRecord
  has_many :strokes, dependent: :destroy
  has_secure_token :slug

  validates :name, presence: true, length: { maximum: 64 }

  def to_param
    slug
  end
end
