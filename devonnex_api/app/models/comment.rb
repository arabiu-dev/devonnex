# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  self.primary_key = :id
  before_create :set_id

  validates :content, presence: true

  private

  def set_id
    self.id = SecureRandom.uuid
  end
end
