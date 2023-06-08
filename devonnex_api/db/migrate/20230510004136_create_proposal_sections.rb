# frozen_string_literal: true

class CreateProposalSections < ActiveRecord::Migration[7.0]
  def change
    create_table :proposal_sections, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.text :description
      t.string :bullets, array: true, default: []
      t.string :header
      t.uuid :proposal_id

      t.timestamps
    end

    add_foreign_key :proposal_sections, :proposals, column: :proposal_id, primary_key: :id, on_delete: :cascade
  end
end
