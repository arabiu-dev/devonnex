# frozen_string_literal: true

class ProposalSectionSerializer < ActiveModel::Serializer
  attributes :id, :header, :description, :bullets

  belongs_to :proposal
end
