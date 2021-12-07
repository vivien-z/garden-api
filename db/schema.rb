# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_02_201117) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.bigint "zone_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["zone_id"], name: "index_cities_on_zone_id"
  end

  create_table "collections", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "plant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["plant_id"], name: "index_collections_on_plant_id"
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "gardens", force: :cascade do |t|
    t.string "name"
    t.float "width"
    t.float "length"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "city_id"
    t.index ["city_id"], name: "index_gardens_on_city_id"
    t.index ["user_id"], name: "index_gardens_on_user_id"
  end

  create_table "plant_info_by_zones", force: :cascade do |t|
    t.bigint "zone_id", null: false
    t.bigint "plant_id", null: false
    t.boolean "indoor_seeding"
    t.date "seeding_date"
    t.date "transplant_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["plant_id"], name: "index_plant_info_by_zones_on_plant_id"
    t.index ["zone_id"], name: "index_plant_info_by_zones_on_zone_id"
  end

  create_table "plant_position_by_gardens", force: :cascade do |t|
    t.float "positionX"
    t.float "positionY"
    t.bigint "plant_id", null: false
    t.bigint "garden_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["garden_id"], name: "index_plant_position_by_gardens_on_garden_id"
    t.index ["plant_id"], name: "index_plant_position_by_gardens_on_plant_id"
  end

  create_table "plants", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "light"
    t.float "size"
    t.index ["user_id"], name: "index_plants_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "authentication_token", limit: 30
    t.bigint "city_id"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["city_id"], name: "index_users_on_city_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "zones", force: :cascade do |t|
    t.string "zone_code"
    t.float "temperature"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "cities", "zones"
  add_foreign_key "collections", "plants"
  add_foreign_key "collections", "users"
  add_foreign_key "gardens", "cities"
  add_foreign_key "gardens", "users"
  add_foreign_key "plant_info_by_zones", "plants"
  add_foreign_key "plant_info_by_zones", "zones"
  add_foreign_key "plant_position_by_gardens", "gardens"
  add_foreign_key "plant_position_by_gardens", "plants"
  add_foreign_key "plants", "users"
  add_foreign_key "users", "cities"
end
