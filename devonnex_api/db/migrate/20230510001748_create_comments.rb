# frozen_string_literal: true

class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :user_id
      t.text :content
      t.uuid :post_id

      t.timestamps
    end

    add_foreign_key :comments, :users, column: :user_id, primary_key: :id, on_delete: :cascade
    add_foreign_key :comments, :posts, column: :post_id, primary_key: :id, on_delete: :cascade
  end
end
