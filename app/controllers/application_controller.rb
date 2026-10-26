class ApplicationController < ActionController::Base
  before_action :require_name

  rescue_from MissingName, with: :redirect_to_entrance
  rescue_from ActionController::ParameterMissing,
              ActiveRecord::RecordInvalid, with: :reject_input

  helper_method :fetch_name

  private

  def require_name
    fetch_name
  end

  def fetch_name
    session.fetch(:name) { raise MissingName }
  end

  def redirect_to_entrance
    redirect_to root_path
  end

  def reject_input(error)
    redirect_back fallback_location: root_path, alert: error.message
  end
end
