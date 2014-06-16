class AuthenticationController < ApplicationController
  before_filter :authenticate_user, :only => [:account_settings, :set_account_info]

def sign_in
  @user = User.new
end
#For signing in
def login
  username_or_email = params[:user][:username]
  password = params[:user][:password]

  if username_or_email.rindex('@')
    email = username_or_email
    user = User.authenticate_by_email(email, password)
  else
    username = username_or_email
    user = User.authenticate_by_username(username, password)
  end

  if user
    user.last_signed_in_on = DateTime.now
    user.save
    session[:user_id] = user.id
    flash[:notice] = 'Welcome'
    redirect_to :root
  else
    flash[:error] = 'Unknown user. Please check your username and password.'
    render :action => "sign_in"
  end

end
#Signing out
def signed_out
  session[:user_id] = nil
  flash[:notice] = 'You have been signed out.'
end
#To register a new user
def new_user
    @user = User.new
end

def register
    @user = User.new(params[:user])

    if @user.valid?
      @user.signed_up_on = DateTime.now
      @user.last_signed_in_on = @user.signed_up_on
      @user.save
      session[:user_id] = @user.id
      flash[:notice] = 'Welcome.'
      redirect_to :root
    else
      render :action => "new_user"
    end
end

end