module ApplicationHelper
  def render_name_badge
    render "shared/name_badge", name: fetch_name
  end
end
