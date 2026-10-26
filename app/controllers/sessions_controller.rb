class SessionsController < ApplicationController
  skip_before_action :require_name, only: %i[new create]
  def new; end

  def create
    session[:name] = Name.new(params.require(:name)).to_s
    redirect_to boards_path
  end

  def destroy
    resest_session
    redirect_to root_path
  end
end
