class HomeController < ApplicationController
  def index
  	if !current_user
  		redirect_to sign_in_path
  	end
  	@testbed = Testbed.all
  end

end