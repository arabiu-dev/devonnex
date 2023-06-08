# frozen_string_literal: true

class Proposal < ApplicationRecord
  belongs_to :gig
  belongs_to :user
  has_many :proposal_sections, dependent: :delete_all
end
