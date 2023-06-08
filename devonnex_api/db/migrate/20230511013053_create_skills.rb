# frozen_string_literal: true

class CreateSkills < ActiveRecord::Migration[7.0]
  def change
    create_table :skills, id: false do |t|
      t.uuid :id, primary_key: true, default: -> { 'gen_random_uuid()' }
      t.string :name
      t.string :user_id

      t.timestamps
    end

    add_foreign_key :skills, :users, column: :user_id, primary_key: :id, on_delete: :cascade
  end
end
