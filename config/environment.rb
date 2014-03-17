# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Auth::Application.initialize!

require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist
