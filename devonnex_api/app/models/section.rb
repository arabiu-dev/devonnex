# frozen_string_literal: true

class Section < ApplicationRecord
  belongs_to :gig

  validates :description, presence: true
  validates :header, presence: true
end
