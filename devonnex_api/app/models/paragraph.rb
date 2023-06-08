# frozen_string_literal: true

class Paragraph < ApplicationRecord
  belongs_to :post

  self.primary_key = :id
  before_create :set_id

  validates :content, presence: true
  validates :order, presence: true, numericality: { only_integer: true }

  private

  def set_id
    self.id = SecureRandom.uuid
  end
end
