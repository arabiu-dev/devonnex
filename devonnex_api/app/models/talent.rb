# frozen_string_literal: true

class Talent < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :ads_url, presence: true
  validates :rate, numericality: { greater_than_or_equal_to: 0 }, presence: true
end
