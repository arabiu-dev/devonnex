# frozen_string_literal: true

class CreateParagraphs < ActiveRecord::Migration[7.0]
  def change
    create_table :paragraphs, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.text :content
      t.integer :order
      t.uuid :post_id

      t.timestamps
    end

    add_foreign_key :paragraphs, :posts, column: :post_id, primary_key: :id, on_delete: :cascade
  end
end
