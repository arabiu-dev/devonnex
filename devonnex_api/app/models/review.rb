# frozen_string_literal: true

class Review < ApplicationRecord
  belongs_to :gig
  belongs_to :user

  validates :from_user, presence: true
  validates :to_user, presence: true
  validates :content, presence: true
end
