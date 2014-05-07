# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140218182508) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel", force: true do |t|
    t.string  "modulation",     limit: nil
    t.integer "channel_number"
    t.float   "frequency"
  end

  create_table "configurations", id: false, force: true do |t|
    t.string "name",  limit: nil, null: false
    t.string "value", limit: nil, null: false
  end

# Could not dump table "ldap_pendency" because of following StandardError
#   Unknown type 'ldap_pendency_actions_enum' for column 'action'

  create_table "motherboard", force: true do |t|
    t.string  "cpu_type",   limit: nil
    t.string  "cpu_number", limit: nil
    t.float   "cpu_hz"
    t.integer "hd_size"
    t.integer "memory"
  end

  create_table "node", force: true do |t|
    t.string  "control_ip",     limit: nil
    t.string  "control_mac",    limit: nil
    t.string  "cmc_ip",         limit: nil
    t.string  "hostname",       limit: nil
    t.string  "hrn",            limit: nil
    t.string  "chassis_sn",     limit: nil
    t.integer "motherboard_id"
    t.integer "pxeimage_id"
    t.string  "disk",           limit: nil
  end

  create_table "pxeimages", force: true do |t|
    t.string "image_name",        limit: nil
    t.text   "short_description"
  end

  create_table "reservation", force: true do |t|
    t.integer  "slice_id"
    t.datetime "begin_time"
    t.datetime "end_time"
    t.boolean  "full",                   default: false, null: false
    t.string   "user",       limit: nil,                 null: false
  end

  create_table "resource_reservation", id: false, force: true do |t|
    t.integer "resource_id",    null: false
    t.integer "reservation_id", null: false
  end

# Could not dump table "resources" because of following StandardError
#   Unknown type 'resources_enum' for column 'type'

  create_table "slice", force: true do |t|
    t.string   "name",    limit: nil
    t.datetime "expires"
  end

  create_table "slice_resources", id: false, force: true do |t|
    t.integer "slice_id",    null: false
    t.integer "resource_id", null: false
  end

  create_table "slice_users", id: false, force: true do |t|
    t.integer "slice_id",             null: false
    t.string  "user",     limit: nil, null: false
  end

  create_table "testbed", id: false, force: true do |t|
    t.string  "name",      limit: nil
    t.float   "cord_x"
    t.float   "cord_y"
    t.string  "domain",    limit: nil
    t.integer "gidnumber",             default: 1200, null: false
  end

  create_table "user", force: true do |t|
    t.string  "username",      limit: nil
    t.string  "password",      limit: nil
    t.string  "name",          limit: nil
    t.string  "email",         limit: nil
    t.string  "public_key",    limit: nil
    t.boolean "enable",                    default: false
    t.boolean "admin",                     default: false
    t.string  "homedirectory", limit: nil
    t.integer "gidnumber"
    t.string  "loginshell",    limit: nil, default: "/bin/bash", null: false
  end

  add_index "user", ["email"], name: "user_email_key", unique: true, using: :btree
  add_index "user", ["username"], name: "user_username_key", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "encrypted_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "signed_up_on"
    t.datetime "last_signed_in_on"
  end

end
