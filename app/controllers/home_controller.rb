class HomeController < ApplicationController
  def index
  	if !current_user
  		redirect_to sign_in_path
  	end
  	@nodes = Node.all
  	@neighs = Neighborhood.all
  end

  def scriptresult
  	if !current_user
  		redirect_to sign_in_path
  	end
  end

end