# frozen_string_literal: true

class CreateLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :links, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :media_type
      t.string :url
      t.string :user_id

      t.timestamps
    end

    add_foreign_key :links, :users, column: :user_id, primary_key: :id, on_delete: :cascade
  end
end
