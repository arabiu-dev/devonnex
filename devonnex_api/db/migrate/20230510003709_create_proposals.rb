# frozen_string_literal: true

class CreateProposals < ActiveRecord::Migration[7.0]
  def change
    create_table :proposals, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.uuid :gig_id
      t.string :user_id

      t.timestamps
    end

    add_foreign_key :proposals, :gigs, column: :gig_id, primary_key: :id, on_delete: :cascade
    add_foreign_key :proposals, :users, column: :user_id, primary_key: :id, on_delete: :cascade
  end
end
