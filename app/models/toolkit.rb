class Toolkit
  Tool = Data.define(:name, :label, :icon)

  TOOLS = [
    Tool.new("pen",    "Pen",    "bi-pencil-fill"),
    Tool.new("eraser", "Eraser", "bi-eraser-fill")
  ].freeze
end
