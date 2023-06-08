# frozen_string_literal: true

class Link < ApplicationRecord
  belongs_to :user

  self.primary_key = :id
  before_create :set_id

  validates :media_type, presence: true
  validates :url, presence: true

  private

  def set_id
    self.id = SecureRandom.uuid
  end
end
