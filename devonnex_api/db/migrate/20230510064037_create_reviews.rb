# frozen_string_literal: true

class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :from_user
      t.string :to_user
      t.string :content
      t.uuid :gig_id
      t.string :user_id

      t.timestamps
    end

    add_foreign_key :reviews, :gigs, column: :gig_id, primary_key: :id, on_delete: :cascade
    add_foreign_key :reviews, :users, column: :user_id, primary_key: :id, on_delete: :cascade
  end
end
