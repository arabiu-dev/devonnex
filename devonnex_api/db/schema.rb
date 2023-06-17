# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_15_000714) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_id"
    t.text "content"
    t.uuid "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gigs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_id"
    t.string "title"
    t.string "location"
    t.float "payment_amount"
    t.integer "payment_per"
    t.string "duration"
    t.text "overview"
    t.integer "status"
    t.integer "no_of_freelancers"
    t.string "offered_to"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "links", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "media_type"
    t.string "url"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "paragraphs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "content"
    t.integer "order"
    t.uuid "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_id"
    t.string "title"
    t.string "topic"
    t.string "image_url"
    t.string "tags", default: [], array: true
    t.integer "readtime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tags"], name: "index_posts_on_tags", using: :gin
  end

  create_table "proposal_sections", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "description"
    t.string "bullets", default: [], array: true
    t.string "header"
    t.uuid "proposal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "proposals", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "gig_id"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "from_user"
    t.string "to_user"
    t.string "content"
    t.uuid "gig_id"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sections", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "header"
    t.string "description"
    t.string "bullets", default: [], array: true
    t.uuid "gig_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "talents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "ads_url"
    t.string "title"
    t.float "rate"
    t.string "user_id"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "full_name"
    t.string "username", null: false
    t.string "image_url"
    t.string "work_email"
    t.string "expertise"
    t.string "phone_number"
    t.text "bio"
    t.float "revenue"
    t.float "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "comments", "posts", on_delete: :cascade
  add_foreign_key "comments", "users", on_delete: :cascade
  add_foreign_key "gigs", "users", on_delete: :cascade
  add_foreign_key "links", "users", on_delete: :cascade
  add_foreign_key "paragraphs", "posts", on_delete: :cascade
  add_foreign_key "posts", "users", on_delete: :cascade
  add_foreign_key "proposal_sections", "proposals", on_delete: :cascade
  add_foreign_key "proposals", "gigs", on_delete: :cascade
  add_foreign_key "proposals", "users", on_delete: :cascade
  add_foreign_key "reviews", "gigs", on_delete: :cascade
  add_foreign_key "reviews", "users", on_delete: :cascade
  add_foreign_key "sections", "gigs", on_delete: :cascade
  add_foreign_key "skills", "users", on_delete: :cascade
  add_foreign_key "talents", "users", on_delete: :cascade
end
