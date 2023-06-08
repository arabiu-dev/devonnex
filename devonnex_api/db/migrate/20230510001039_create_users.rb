# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: false do |t|
      t.string :id, primary_key: true # , default: -> { "gen_random_uuid()" }
      t.string :full_name
      t.string :username, null: false, index: { unique: true }
      t.string :image_url
      t.string :work_email
      t.string :expertise
      t.string :phone_number
      t.text :bio
      t.float :revenue
      t.float :rating

      t.timestamps
    end
  end
end
