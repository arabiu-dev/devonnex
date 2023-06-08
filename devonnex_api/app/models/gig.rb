# frozen_string_literal: true

class Gig < ApplicationRecord
  belongs_to :user
  has_many :sections, dependent: :delete_all
  has_many :reviews, dependent: :delete_all
  has_many :proposals, dependent: :delete_all

  self.primary_key = :id
  before_create :set_id

  enum status: %i[Open Interviewing Hired Cancel]
  enum payment_per: %i[Hour Gig]

  validates :user_id, presence: true
  validates :title, presence: true
  validates :location, presence: true
  validates :payment_amount, numericality: { greater_than_or_equal_to: 0 }, presence: true
  validates :duration, presence: true
  validates :overview, presence: true

  private

  def set_id
    self.id = SecureRandom.uuid
  end
end
