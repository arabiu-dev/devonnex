# frozen_string_literal: true

class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :header
      t.string :description
      t.string :bullets, array: true, default: []
      t.uuid :gig_id

      t.timestamps
    end

    add_foreign_key :sections, :gigs, column: :gig_id, primary_key: :id, on_delete: :cascade
  end
end
