class Name
  MAX_LENGTH = 32

  def initialize(raw)
    @value = raw.to_s.strip.first(MAX_LENGTH)
    raise ActionController::ParameterMissing, :name if @value.empty?
  end

  def to_s
    @value
  end
end
