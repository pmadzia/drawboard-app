class Board < ApplicationRecord
  has_many :strokes, dependent: :destroy
  has_secure_token :slug

  validates :name, presence: true, length: { maximum: 64 }

  scope :listed, -> { select(column_names - %w[thumbnail]).order(created_at: :desc) }
  validates :thumbnail, length: { maximum: 300.kilobytes }, allow_nil: true

  def to_param
    slug
  end

  def fetch_thumbnail
    thumbnail.presence || raise(ActiveRecord::RecordNotFound)
  end
end
