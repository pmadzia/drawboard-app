class Controls
  CATALOG = {
    "Pan the canvas"  => %w[Spacebar Drag],
    "Zoom in or out"  => %w[Ctrl Scroll],
    "Reset zoom"      => [ "Click the zoom %" ]
  }.freeze

  attr_reader :label, :keys

  def self.all
    CATALOG.map { |label, keys| new(label, keys) }
  end

  def initialize(label, keys)
    @label = label
    @keys = keys
  end
end
