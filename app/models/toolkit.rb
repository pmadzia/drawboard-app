class Toolkit
  Tool = Data.define(:name, :label, :icon)

  TOOLS = [
    Tool.new("pen",    "Pen",    "bi-pencil-fill"),
    Tool.new("eraser", "Eraser", "bi-eraser-fill")
  ].freeze

  Color = Data.define(:name, :hex)

  COLORS = [
    Color.new("Black",  "#1f1d36"),
    Color.new("Red",    "#e74c3c"),
    Color.new("Orange", "#f39c12"),
    Color.new("Green",  "#27ae60"),
    Color.new("Blue",   "#3498db"),
    Color.new("Purple", "#6c5ce7")
  ].freeze
end
