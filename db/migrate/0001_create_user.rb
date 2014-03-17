class CreateUsers < ActiveRecord::Migration
  def change #self.up
    create_table :users do |t|
       t.string :username
       t.string :email
       t.string :encrypted_password
       t.string :salt
       t.timestamps
    end
  end
=begin
  def self.down
    drop_table :users
  end
=end
end