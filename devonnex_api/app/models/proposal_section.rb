# frozen_string_literal: true

class ProposalSection < ApplicationRecord
  belongs_to :proposal

  validates :description, presence: true
  validates :header, presence: true
end
