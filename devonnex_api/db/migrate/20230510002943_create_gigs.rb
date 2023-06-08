# frozen_string_literal: true

class CreateGigs < ActiveRecord::Migration[7.0]
  def change
    create_table :gigs, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :user_id
      t.string :title
      t.string :location
      t.float :payment_amount
      t.integer :payment_per
      t.string :duration
      t.text :overview
      t.integer :status
      t.integer :no_of_freelancers
      t.string :offered_to
      t.string :category

      t.timestamps
    end

    add_foreign_key :gigs, :users, column: :user_id, primary_key: :id, on_delete: :cascade
  end
end
