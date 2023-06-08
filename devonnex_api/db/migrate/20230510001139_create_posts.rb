# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :user_id
      t.string :title
      t.string :topic
      t.string :image_url
      t.string :tags, array: true, default: []
      t.integer :readtime

      t.timestamps
    end

    add_foreign_key :posts, :users, column: :user_id, primary_key: :id, on_delete: :cascade
    add_index :posts, :tags, using: 'gin'
  end
end
