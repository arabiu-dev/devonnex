# frozen_string_literal: true

class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :user_id

  has_many :proposal_sections
  belongs_to :gig
  belongs_to :user
end
